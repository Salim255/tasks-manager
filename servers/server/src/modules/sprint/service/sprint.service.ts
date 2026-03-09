import { Inject, Injectable, Logger } from '@nestjs/common';
import { SPRINT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Sprint } from '../entity/sprint.entity';

@Injectable()
export class SprintService {
  private logger = new Logger(SprintService.name);

  constructor(
    @Inject(SPRINT_REPOSITORY) private sprintRepo: Repository<Sprint>,
  ) {}

  async createSprint(payload: { projectId: string }): Promise<Sprint> {
    try {
      const values = [payload.projectId];
      const query = `
        WITH sprint_counter AS (
          SELECT COUNT(*) AS total
            FROM sprints AS sp
              WHERE sp."projectId" = $1
        ),
      
        inserted AS (
          INSERT INTO sprints (name, "projectId")
            SELECT CONCAT('sprint', sprint_counter.total + 1),
              $1
            FROM sprint_counter
          RETURNING *
        )
      
        SELECT * FROM inserted;
      `;
      const sprint: Sprint = await this.sprintRepo.query(query, values);
      return sprint;
    } catch (error) {
      this.logger.error('Error to create sprint');
      throw error;
    }
  }

  async countProjectSprints(projectId: string): Promise<number> {
    try {
      const query = `
        SELECT COUNT(*) AS totalSprint
          FROM sprints AS spt
            WHERE spt."projectId" = $1
        `;
      const counter: number = await this.sprintRepo.query(query, [projectId]);
      return counter;
    } catch (error) {
      this.logger.error('Error counting sprints by project');
      throw error;
    }
  }
}
