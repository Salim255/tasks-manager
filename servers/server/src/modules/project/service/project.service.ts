import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}

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

          COALESCE (
            (
              SELECT json_agg ( task.* )
                FROM tasks AS task
                  WHERE task."projectId" = project.id
            ),
            '[]'::json
          ) AS tasks,
         

          COALESCE (
            (
              SELECT json_agg ( sprint.* )
                FROM sprints AS sprint
                  WHERE sprint."projectId" = project.id
          ),
          '[]'::json
          ) AS sprints,

          to_jsonb(p.* ) AS profile

        FROM projects AS project

        JOIN profiles p ON p."userId" = project."ownerId"

        WHERE project."ownerId" = $1;
      `;
      const rows: Project[] = await this.projectRepo.query(query, [ownerId]);
      console.log(rows);
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
