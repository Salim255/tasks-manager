import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DATA_SOURCE, PROJECT_REPOSITORY } from 'src/common/constants/constants';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { Project } from '../entity/project.entity';
import { CreateProjectDto, ProjectDto, ProjectOwnerDto, ProjectStatus } from '../dto/project.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { DtoMapper } from 'src/common/utils/dtoMapper';
import { TableRelationBuilder } from 'src/common/utils/tableRelationBuilder';
import { sortByDate } from 'src/common/utils/sort.utils';
import { Task } from 'src/modules/task/entity/task.entity';
import { DashboardOverviewDto, NeedsAttentionDto, ProjectsOverviewDto, ProjectSprintOverviewDto, ProjectTasksOverviewDto, RecentProjectDto, TasksOverviewDto } from '../dto/dashboard-overview.dto';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { SprintStatus } from 'src/modules/sprint/dto/sprint.dto';
import { take } from 'rxjs';
import { DashboardOverviewMapper } from 'src/common/utils/dashboardOverviewMapper';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @Inject(DATA_SOURCE)
    private data_source: DataSource,
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}


  async geDashboardOverViewDto(userId: string){
    try {
      
      const recentProjects: RecentProjectDto[]  = await this.getRecentProjectsMetrics(userId);
      
      const projects = await this.projectRepo
        .createQueryBuilder("project")
        .leftJoin("project.members", "member")
        .where("project.ownerId=:ownerId", { ownerId: userId })
        .orWhere("member.userId =:userId", { userId })
        .getMany();
      
      // 2. Extract IDs
      const projectIds = projects.map(p => p.id);

      // 3. Calculate project metrics
      const activeProjectsCount = projects?.filter(pr=> pr.status === ProjectStatus.ACTIVE)?.length ?? 0;
     
      const tasks =  await this.data_source.manager
        .createQueryBuilder(Task, 'task')
        .select("task.projectId", "projectId")
        .addSelect("task.status", "status")
        .addSelect("task.assigneeId", "assigneeId")
        .addSelect("COUNT(*)", "count")
        .where("task.projectId IN (:...ids)", { ids: projectIds })
        .groupBy("task.projectId")
        .addGroupBy("task.status")
        .addGroupBy("task.assigneeId")
        .getRawMany()
      
      const sprints = await this.data_source.manager
        .createQueryBuilder(Sprint, "sprint")
        .select("sprint.projectId", "projectId")
        .addSelect("sprint.status", "status")
        .addSelect("sprint.id", "sprintId")
        .addSelect("COUNT(*)", "count")
        .where("sprint.projectId IN (:...ids)", { ids: projectIds })
        .groupBy("sprint.projectId")
        .addGroupBy("sprint.status")
        .addGroupBy("sprint.id")
        .getRawMany()
        
      const projectTasksOverviewDto: ProjectTasksOverviewDto =
        DashboardOverviewMapper.projectTasksOverviewDto(userId, tasks);

      const projectSprintOverviewDto: ProjectSprintOverviewDto =
        DashboardOverviewMapper.projectSprintOverviewDto(sprints);

      const projectsOverviewDto : ProjectsOverviewDto =
        {
          activeProjectsCount,
          lastUpdatedProjectsCount: activeProjectsCount,
          tasks: projectTasksOverviewDto,
          sprints: projectSprintOverviewDto
        };

      
      const getActiveSprints =  sprints.filter(sp => sp.status === "active")
      //const tasksOverviewDto: TasksOverviewDto =  {}
      //return projectsOverviewDto;
      //return getTaskOverview;
    
      const activeSprintsIds = getActiveSprints.map(activeSprint => activeSprint.sprintId);

      // Get tasks the belong to this sprintIds and are assigned to me
      // and are due to tomorrow and today and height   
      const needsAttentionDto: NeedsAttentionDto = await this.getAssigneeToMeTasksNeedsAttentionDto(activeSprintsIds);

      const assignedMeDueThisWeekCounter = await this.getAssigneeToMeTasksDueThisWeek(activeSprintsIds);

      const result: DashboardOverviewDto = {
        projectsOverview: projectsOverviewDto,
        assignedToMe: {
          totalAssigned: projectsOverviewDto.tasks.assignedToMeCount,
          dueThisWeek: assignedMeDueThisWeekCounter,
          needsAttention: needsAttentionDto
        },
        recentProjects: recentProjects
      }
      return result;
      //return getActiveSprints;
      //return activeSprintsIds
    } catch (error){
        throw error
    }
  }

  async getProjectById({
    projectId,
    userId,
    relations
  }: {
    projectId: string;
    userId: string;
    relations: string [];
  }): Promise<ProjectDto | null> {
    try {
      const projectRelations:FindOptionsRelations<Project> = TableRelationBuilder.projectRelationsBuilder(relations);

      
      const project = await this.projectRepo.findOne(
        {
          where: { id: projectId },
          relations: projectRelations,
          order: {
            sprints: {
              createdAt: 'DESC'
            },
            tasks: {
              createdAt: 'DESC'
            }
          }
        }
      )

      if (!project) return null

      const response = {
        ...project,
        owner: this.projectOwnerMapper(project.owner),
        tasks: project.tasks?.map(task => DtoMapper.projectTaskMapper(task)),
        sprints: project.sprints?.map(sprint => DtoMapper.projectSprintMapper(sprint)),
        members: project.members?.map(member => DtoMapper.projectMemberMapper(member),
        ),
      }
      
      return response;
      
    } catch (error) {
      this.logger.error('Error to fetch single project', error);
      throw error;
    }
  }


  async getUserProjects(): Promise<Project[]> {
    try {
      const query = `
        SELECT *,

          (
            SELECT json_agg ( task.* )
              FROM tasks AS task
                WHERE task."projectId" = project.id
          ) AS tasks,

          (
            SELECT json_agg ( sprint.* )
              FROM sprints AS sprint
                WHERE sprint."projectId" = project.id
          ) AS sprints

        FROM projects AS project;
      `;
      const rows: Project[] = await this.projectRepo.query(query, []);
      return rows;
    } catch (error) {
      this.logger.error('Error to fetch user projects', error);
      throw new InternalServerErrorException('Failed to fetch user projects');
    }
  }

  async getUserProjectsByUser({
    ownerId,
    relations,
    demoClientId,
    isDemo,
  }: {
    ownerId: string;
    relations: string [];
    demoClientId: string | null;
    isDemo: boolean;
  }): Promise<ProjectDto[]> {
    try {
      const projectRelations:FindOptionsRelations<Project> =
        TableRelationBuilder.projectRelationsBuilder(relations);

      const where: FindOptionsWhere<Project> = {
        ownerId,
        ...((demoClientId && isDemo) ? { demoClientId } : {}),
      };

      const projects = await this.projectRepo.find({
        where: where,
        relations: projectRelations,
      });

      const response = projects?.map(project => ({
        ...project,
        owner: project.owner ? this.projectOwnerMapper(project.owner): null,
        tasks: project?.tasks ? sortByDate(project?.tasks?.map(task => DtoMapper.projectTaskMapper(task))): [],
        sprints: project?.sprints ? sortByDate(project?.sprints?.map(sprint => DtoMapper.projectSprintMapper(sprint))): [],
        members: project?.members ? project?.members?.map(member => DtoMapper.projectMemberMapper(member)): [],
      }));

      return response;
    } catch (error) {
      this.logger.error('Error to fetch user projects', error);
      throw new InternalServerErrorException('Failed to fetch user projects');
    }
  }

  async createProject(
    payload: CreateProjectDto & { ownerId: string; demoClientId?: string },
  ): Promise<Project> {
    try {
      const values = [
        payload.name,
        payload.key,
        payload.description,
        payload.ownerId,
        payload.demoClientId
      ];

      const query = `
        INSERT INTO projects (name, key,  description, "ownerId", "demoClientId")
          VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;

      const project: Project[] = await this.projectRepo.query(query, values);
      return project[0];
    } catch (error) {
      this.logger.error('Error in create a project', error);
      throw error;
    }
  }



  private projectOwnerMapper(owner: User): ProjectOwnerDto | null {
    if(!owner) return null;

    const profile = owner?.profile;
    return{
      id: owner?.id,
      profile: profile ?  {
        id: profile?.id ,
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        avatarUrl: profile?.avatarUrl || '',
        bio: profile?.bio || '',
      }: null
    }
  }

  async getRecentProjectsMetrics(userId: string) {
  return await this.projectRepo
    .createQueryBuilder("project")
    .leftJoin("project.members", "member")
    .leftJoin("project.tasks", "task")
    .leftJoin("task.sprint", "sprint")
    .select([
      "project.id AS id",
      "project.name AS name",
      "project.key AS key",

      `COUNT(DISTINCT task.id) AS "totalTasks"`,

      `COUNT(DISTINCT CASE 
        WHEN task.status = 'done' 
        THEN task.id 
      END) AS "completedTasks"`,

      `
      CASE 
        WHEN COUNT(DISTINCT task.id) = 0 THEN 0
        ELSE ROUND(
          COUNT(DISTINCT CASE WHEN task.status = 'done' THEN task.id END)::decimal
          /
          COUNT(DISTINCT task.id)::decimal
          * 100
        )
      END AS "progressPercentage"
      `,

      `
      json_build_object(
        'active', json_build_object(
          'total', COUNT(DISTINCT CASE WHEN sprint.status = 'active' THEN sprint.id END),
          'tasksNumber', COUNT(DISTINCT CASE WHEN sprint.status = 'active' THEN task.id END)
        ),

        'planned', json_build_object(
          'total', COUNT(DISTINCT CASE WHEN sprint.status = 'planned' THEN sprint.id END),
          'tasksNumber', COUNT(DISTINCT CASE WHEN sprint.status = 'planned' THEN task.id END)
        ),

        'completed', json_build_object(
          'total', COUNT(DISTINCT CASE WHEN sprint.status = 'completed' THEN sprint.id END),
          'tasksNumber', COUNT(DISTINCT CASE WHEN sprint.status = 'completed' THEN task.id END)
        )
      ) AS sprints
      `
    ])
    .where("project.ownerId = :userId", { userId })
    .orWhere("member.userId = :userId", { userId })
    .groupBy("project.id")
    .getRawMany();
}

  async getAssigneeToMeTasksDueThisWeek(activeSprintsIds: string[]): Promise<number>{
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const result = await this.data_source.manager
      .createQueryBuilder(Task, 'task')
      .select("COUNT(*)", "count")
      .where("task.sprintId IN (:...ids)", { ids: activeSprintsIds })
      .andWhere("task.dueAt >= :startOfWeek", { startOfWeek })
      .andWhere("task.dueAt < :endOfWeek", { endOfWeek })
      .getRawOne();

    return Number(result?.count) ?? 0;
  }

  async getAssigneeToMeTasksNeedsAttentionDto(activeSprintsIds: string[]){
    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);

    const dayAfterTomorrowStart = new Date(tomorrowStart);
    dayAfterTomorrowStart.setDate(tomorrowStart.getDate() + 1);

    return await this.data_source.manager
      .createQueryBuilder(Task, "task")
      .select(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', task.id,
              'title', task.title,
              'issueKey', task.issueKey,
              'taskNumber', task.taskNumber,
              'status', task.status,
              'priority', task.priority,
              'taskType', task.taskType,
              'dueAt', task.dueAt,
              'projectId', task.projectId,
              'sprintId', task.sprintId,
              'assigneeId', task.assigneeId,
              'createdAt', task.createdAt,
              'updatedAt', task."updatedAt"
            )
            ORDER BY task."dueAt" ASC
          ) FILTER (
            WHERE task."dueAt" >= :todayStart
              AND task."dueAt" < :tomorrowStart
          ),
          '[]'
        )
      `, "today")
      .addSelect(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', task.id,
              'title', task.title,
              'issueKey', task.issueKey,
              'taskNumber', task."taskNumber",
              'status', task.status,
              'priority', task.priority,
              'taskType', task."taskType",
              'dueAt', task.dueAt,
              'projectId', task."projectId",
              'sprintId', task."sprintId",
              'assigneeId', task."assigneeId",
              'createdAt', task."createdAt",
              'updatedAt', task."updatedAt"
            )
            ORDER BY task."dueAt" ASC
          ) FILTER (
            WHERE task."dueAt" >= :tomorrowStart
              AND task."dueAt" < :dayAfterTomorrowStart
          ),
          '[]'
        )
      `, "tomorrow")
      .addSelect(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', task.id,
              'title', task.title,
              'issueKey', task.issueKey,
              'taskNumber', task."taskNumber",
              'status', task.status,
              'priority', task.priority,
              'taskType', task."taskType",
              'dueAt', task."dueAt",
              'projectId', task."projectId",
              'sprintId', task."sprintId",
              'assigneeId', task."assigneeId",
              'createdAt', task."createdAt",
              'updatedAt', task."updatedAt"
            )
            ORDER BY task."dueAt" ASC
          ) FILTER (
            WHERE task.priority =:highPriority
              AND (
              task."dueAt" IS NULL
              OR NOT (
                (task."dueAt" >= :todayStart AND task."dueAt" < :tomorrowStart)
                OR
                (task."dueAt" >= :tomorrowStart AND task."dueAt" < :dayAfterTomorrowStart)
              )
            )
          ),
          '[]'
        )
      `, "highPriority")
      .where("task.sprintId IN (:...ids)", { ids: activeSprintsIds })
      .andWhere("task.status != :doneStatus", { doneStatus: "done" })
      // optional if you want only "assigned to me"
      // .andWhere("task.assigneeId = :userId", { userId })
      .setParameters({
        todayStart,
        tomorrowStart,
        dayAfterTomorrowStart,
        highPriority: "high",
      })
      .getRawOne();
  }
}
