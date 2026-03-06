import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
        SELECT * FROM projecs;
      `;
      const rows: Project[] = await this.projectRepo.query(query, []);
      return rows;
    } catch (error) {
      this.logger.error('Error to fetch user projects', error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Failed to fetch user projects',
        data: null,
      });
    }
  }
}
