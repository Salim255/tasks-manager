import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepo: Repository<Project>,
  ) {}

  async getUserProjects(): Promise<Project[]> {
    const query = `
      SELECT * FROM projects;
    `;

    const rows: Project[] = await this.projectRepo.query(query, []);
    return rows;
  }
}
