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
import { ProjectsOverviewDto, ProjectSprintOverviewDto, ProjectTasksOverviewDto } from '../dto/dashboard-overview.dto';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { SprintStatus } from 'src/modules/sprint/dto/sprint.dto';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @Inject(DATA_SOURCE)
    private data_source: DataSource,
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}


  async getAccessibleProjects(userId: string){
    try {
  
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
        .addSelect("COUNT(*)", "count")
        .where("task.projectId IN (:...ids)", { ids: projectIds })
        .groupBy("task.projectId")
        .addGroupBy("task.status")
        .getRawMany()
      
      const sprints = await this.data_source.manager
        .createQueryBuilder(Sprint, "sprint")
        .select("sprint.projectId", "projectId")
        .addSelect("sprint.status", "status")
        .addSelect("COUNT(*)", "count")
        .where("sprint.projectId IN (:...ids)", { ids: projectIds })
        .groupBy("sprint.projectId")
        .addGroupBy("sprint.status")
        .getRawMany()
        
      const getTaskOverview = tasks.reduce<ProjectTasksOverviewDto>(
        (
          acc: ProjectTasksOverviewDto,
          task: {
            projectId: string;
            status: string;
            count: string
          }) => {
          const count = Number(task.count);
          console.log(count,task.count )
          acc.total += count;

          switch(task.status){
            case 'done':
              acc.done += count;
              break;
            case 'in_progress':
              acc.inProgress += count;
              break;
            case 'todo':
              acc.todo += count;
              break;
          };
          return acc;
      }, {
        total: 0,
        todo: 0,
        inProgress: 0,
        done: 0,
      })

      const getSprintOverview = sprints.reduce<ProjectSprintOverviewDto>(
        (
          acc: ProjectSprintOverviewDto,
          sprint: {
            status: SprintStatus;
            projectId: string;
            count: string
          }) => {
          const count = Number(sprint.count);
          acc.total += count;

          switch(sprint.status){
            case 'active':
              acc.active += count;
              break;
            case 'completed':
              acc.completed += count;
              break;
            case 'planned':
              acc.planned += count;
              break;
            case 'upcoming':
              acc.upcoming += count;
              break;
          }

          return acc
      }, {
        total: 0,
        active: 0,
        completed: 0,
        planned: 0,
        upcoming: 0
      }) 
      //const projectsOverviewDto : ProjectsOverviewDto = {activeProjectsCount, tasks: tasks as  ProjectTasksOverviewDto[]  };
      return getSprintOverview;
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

      const response = projects.map(project => ({
        ...project,
        owner: this.projectOwnerMapper(project.owner),
        tasks: sortByDate(project?.tasks?.map(task => DtoMapper.projectTaskMapper(task))),
        sprints: sortByDate(project?.sprints?.map(sprint => DtoMapper.projectSprintMapper(sprint))),
        members:  project?.members?.map(member => DtoMapper.projectMemberMapper(member),
        ),
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
}
