import { Inject, Injectable, Logger } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { TaskType } from '../dto/task.dto';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(@Inject(TASK_REPOSITORY) private taskRepo: Repository<Task>) {}

  async createTask(payload: {
    title: string;
    projectId: string;
    taskType: TaskType;
  }): Promise<Task> {
    try {
      const query = `
        INSERT INTO tasks ()
      `;
      const values = [
        payload.projectId,
        payload.title,
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
