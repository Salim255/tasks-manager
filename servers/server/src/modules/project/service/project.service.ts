import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { CreateProjectDto, ProjectDto, ProjectMemberDto, ProjectOwnerDto } from '../dto/project.dto';
import { Member } from 'src/modules/member/entity/member.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { DtoMapper } from 'src/common/utils/dtoMapper';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}


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
      const project = await this.projectRepo.findOne(
        {
          where: {id: projectId}
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
    relations
  }: {
    ownerId: string;
    relations: string []
  }): Promise<ProjectDto[]> {
    try {
      const projectRelations: FindOptionsRelations<Project> = {};

      if (relations.includes('owner')) {
        projectRelations.owner = {
          profile: true,
        };
      }

      if (relations.includes('tasks')) {
        projectRelations.tasks = {
          reporter: {
            profile: true
          },
          assignee: {
            profile: true
          },
        };;
      }

      if (relations.includes('sprints')) {
        projectRelations.sprints =  {
          creator: {
            profile: true
          },
        };
      }

      if (relations.includes('members')) {
        projectRelations.members =  {
          user: {
            profile: true
          },
        };
      }

      console.log(projectRelations, 'projectRelations');
      const projects = await this.projectRepo.find({
        where: { ownerId },
        relations: projectRelations,
      });

      const response = projects.map(project => ({
        ...project,
        owner: this.projectOwnerMapper(project.owner),
        tasks: project.tasks.map(task => DtoMapper.projectTaskMapper(task)),
        sprints: project.sprints.map(sprint => DtoMapper.projectSprintMapper(sprint)),
        members: project.members.map(member => DtoMapper.projectMemberMapper(member),
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
