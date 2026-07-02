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
  }: {
    projectId: string;
    userId: string;
  }): Promise<ProjectDto> {
    try {
      const values = [projectId, userId];
      const query = `
        SELECT *,
          
          -- Add project tasks
          COALESCE (
            (
              SELECT jsonb_agg ( task.* )
                FROM tasks AS task
                  WHERE task."projectId" = project.id
            ),
            '[]'::jsonb
          ) AS tasks,
         
          -- Add project sprints
          COALESCE (
            (
              SELECT jsonb_agg ( sprint.* )
                FROM sprints AS sprint
                  WHERE sprint."projectId" = project.id
          ),
          '[]'::jsonb
          ) AS sprints,

          -- # Add project Members 
          COALESCE (
            (
              SELECT jsonb_agg (
                jsonb_build_object(
                  'id', m.id,
                  'role', m.role,
                  'projectId', m."projectId",
                  'createdAt', m."createdAt",
                  'profile', to_jsonb(pr.*)
                )
              ) 
                  
              FROM members AS m
              JOIN profiles pr ON  pr."userId" = m."userId"
              WHERE m."projectId" = $1
               
            ),
            '[]'::jsonb
          ) AS members,

          -- # Project Owner profile
          COALESCE (
            ( 
              SELECT  to_jsonb ( profile.* ) 
                FROM profiles AS profile
                  WHERE profile."userId" = $2
                LIMIT 1
            ),
            '{}'::jsonb
          ) AS Owner

        FROM projects AS project 

        -- Owner profile
        WHERE project.id = $1 AND project."ownerId" = $2
          OR  project.id = $1 AND  EXISTS (
            SELECT 1
              FROM members AS mb
                WHERE mb."projectId" = project.id AND mb."userId" = $2
          );
      `;

      const rows: ProjectDto[] = await this.projectRepo.query(query, values);
      return rows[0];
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

  async getUserProjectsByUserV2({
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
        members: project.members.map(member => this.projectMemberMapper(member),
        ),
      }));

      return response;
    } catch (error) {
      this.logger.error('Error to fetch user projects', error);
      throw new InternalServerErrorException('Failed to fetch user projects');
    }
  }

  async getUserProjectsByUser(
    {ownerId}: {ownerId: string;}
  ): Promise<Project[]> {
    try {
      const query = `
        SELECT *,
          
          -- Add project tasks
          COALESCE (
            (
              SELECT jsonb_agg ( task.* )
                FROM tasks AS task
                  WHERE task."projectId" = project.id
            ),
            '[]'::jsonb
          ) AS tasks,
         
          -- Add project sprints
          COALESCE (
            (
              SELECT jsonb_agg ( sprint.* )
                FROM sprints AS sprint
                  WHERE sprint."projectId" = project.id
          ),
          '[]'::jsonb
          ) AS sprints,

          -- # Add project Members 
          COALESCE (
            (
            SELECT jsonb_agg ( 
                to_jsonb(m.*) 
                || jsonb_build_object('profile', to_jsonb(pr)
                )
              )
              FROM members AS m
              JOIN profiles pr ON  pr."userId" = m."userId"
                
              WHERE m."projectId" = project.id
               
            ),
            '[]'::jsonb
          ) AS members,

          -- # Project Owner profile
          COALESCE (
            ( 
              SELECT  to_jsonb ( profile.* ) 
                FROM profiles AS profile
                  WHERE profile."userId" = $1
                LIMIT 1
            ),
            '{}'::jsonb
          ) AS Owner

        FROM projects AS project 

        -- Owner profile
        WHERE project."ownerId" = $1
          OR EXISTS (
            SELECT 1
              FROM members AS mb
                WHERE mb."projectId" = project.id
          );
      `;
      const rows: Project[] = await this.projectRepo.query(query, [ownerId]);
      return rows;
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
    const profile = owner.profile;
    return{
      id: owner.id,
      profile: profile ?  {
        id: profile?.id ,
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        avatarUrl: profile?.avatarUrl || '',
        bio: profile?.bio || '',
      }: null
    }
  }

  private projectMemberMapper(member: Member): ProjectMemberDto {

      const profile = member.user?.profile;

      return {
        id: member.id,
        role: member.role,
        userId: member.userId,
        profile: profile
          ? { 
              id: profile.id,
              firstName: profile.firstName,
              lastName: profile.lastName,
              avatarUrl: profile.avatarUrl,
              bio: profile.bio,
            }
          : null,
      };
  }
}
