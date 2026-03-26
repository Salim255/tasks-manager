import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { CreateProjectDto, ProjectDto } from '../dto/project.dto';

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
                  WHERE profile."userId" = $2
                LIMIT 1
            ),
            '{}'::jsonb
          ) AS Owner

        FROM projects AS project 

        -- Owner profile
        WHERE project.id = $1
          OR EXISTS (
            SELECT 1
              FROM members AS mb
                WHERE mb."projectId" = project.id
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

  async getUserProjectsByUser({
    ownerId,
  }: {
    ownerId: string;
  }): Promise<Project[]> {
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
    payload: CreateProjectDto & { ownerId: string },
  ): Promise<Project> {
    try {
      const values = [payload.name, payload.description, payload.ownerId];

      const query = `
      INSERT INTO projects (name, description, "ownerId")
        VALUES ($1, $2, $3)
      RETURNING *;
      `;

      const project: Project[] = await this.projectRepo.query(query, values);
      return project[0];
    } catch (error) {
      this.logger.error('Error in create a project', error);
      throw error;
    }
  }
}
