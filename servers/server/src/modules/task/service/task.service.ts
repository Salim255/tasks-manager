import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { TaskType, UpdateTaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(@Inject(TASK_REPOSITORY) private taskRepo: Repository<Task>) {}

  async updateTask(payload: UpdateTaskDto & { taskId: string }): Promise<Task> {
    try {
      const fields: string[] = [];
      const values: string[] = [];
      let index = 1;

      for (const column of Object.keys(payload)) {
        if (column === 'taskId') continue; // skip primary key

        const value: string | undefined = payload[column] as string | undefined;

        if (value !== undefined) {
          // Quote date columns to avoid case issues
          fields.push(`${column} = $${index++}`);
          values.push(value);
        }
      }

      // No fields provided → reject
      if (fields.length === 0) {
        throw new BadRequestException('No fields provided to update task');
      }

      // Add taskId as last parameter
      // It takes that last updated value of the index in the for loop
      values.push(payload.taskId);

      const query = `
        UPDATE tasks
          SET ${fields.join(', ')}
          WHERE id = $${index}
            RETURNING *;
        `;
      const task: Task[][] = await this.taskRepo.query(query, values);
      return task[0][0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateTaskSprint(payload: {
    taskId: string;
    sprintId: string | null;
  }): Promise<Task> {
    try {
      const query = `
        UPDATE tasks 
          SET "sprintId" = $2
        WHERE tasks.id = $1
        RETURNING *;
      `;
      const updatedTask: Task[][] = await this.taskRepo.query(query, [
        payload.taskId,
        payload.sprintId,
      ]);
      return updatedTask[0][0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

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
