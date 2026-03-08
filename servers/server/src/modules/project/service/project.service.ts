import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}

  async getUserProjects(): Promise<Project[]> {
    try {
      const query = `
        SELECT * FROM projects;
      `;
      const rows: Project[] = await this.projectRepo.query(query, []);
      return rows;
    } catch (error) {
      this.logger.error('Error to fetch user projects', error);
      throw new InternalServerErrorException('Failed to fetch user projects');
    }
  }

  async createProject(payload: {
    name: string;
    description: string;
    ownerId: string;
  }): Promise<Project> {
    try {
      const values = [payload.name, payload.description, payload.ownerId];

      const query = `
      INSERT INTO projects (name, description, "ownerId")
        VALUES ($1, $2, $3)
      RETURNING *;
      `;

      const project: Project = await this.projectRepo.query(query, values);
      return project;
    } catch (error) {
      this.logger.error('Error in create a project', error);
      throw error;
    }
  }
}
