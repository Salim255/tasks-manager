import { Inject, Injectable, Logger } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { TaskType } from '../dto/task.dto';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(@Inject(TASK_REPOSITORY) private taskRepo: Repository<Task>) {}

  async getTasksByProject({ projectId }: { projectId: string }) {
    try {
      const query = `
        SELECT * FROM tasks AS t
        WHERE  t."projectId" = $1;
      `;
      const tasks: Task[] = await this.taskRepo.query(query, [projectId]);
      return tasks;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async createTask(payload: {
    ownerId: string;
    title: string;
    projectId: string;
    taskType: TaskType;
  }): Promise<Task> {
    try {
      const query = `
        INSERT INTO tasks ("ownerId", title, "projectId", "taskType")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [
        payload.ownerId,
        payload.title,
        payload.projectId,
        payload.taskType ?? 'task',
      ];

      const tasks: Task[] = await this.taskRepo.query(query, values);
      return tasks[0];
    } catch (error) {
      this.logger.error('Error to create a task', error);
      throw error;
    }
  }
}
