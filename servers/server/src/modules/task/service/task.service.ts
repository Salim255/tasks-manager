import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DATA_SOURCE, TASK_REPOSITORY } from 'src/common/constants/constants';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';
import { TaskType, UpdateTaskDto } from '../dto/task.dto';
import { quoteIfNeeded } from 'src/common/utils/utils';
import { Project } from 'src/modules/project/entity/project.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
    @Inject(TASK_REPOSITORY) private taskRepo: Repository<Task>
  ) {}

  async updateTask(payload: UpdateTaskDto & { taskId: string }): Promise<Task> {
    try {
      const fields: string[] = [];
      const values: string[] = [];
      let index = 1;

      for (const column of Object.keys(payload)) {
        if (column === 'taskId') continue; // skip primary key

        const value: string | undefined = payload[column] as string | undefined;

        if (value !== undefined) {
          const normalizedColumn = quoteIfNeeded(column);
          // Quote date columns to avoid case issues
          fields.push(`${normalizedColumn} = $${index++}`);
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
    sprintId?: string;
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
    reporterId: string;
    title: string;
    projectId: string;
    sprintId?: string;
    assigneeId?: string;
    taskType: TaskType;
  }): Promise<Task> {
    try {
      console.log(payload, "Hello from create task")
      return await this.dataSource.manager.transaction(async(transactionEntityManger) => {
        // 1. ATOMIC project update (NO lock needed)
        const updatedProject = await transactionEntityManger
          .createQueryBuilder()
          .update(Project)
          .set({
            nextTaskNumber:  () => `"nextTaskNumber" + 1`
          })
          .where("id = :id", { id: payload.projectId })
          .returning(["nextTaskNumber", "key"])
          .execute();


        if (!updatedProject.affected || updatedProject.affected === 0) {
          throw new NotFoundException('Project not found');
        }

        const projectKey = updatedProject.raw[0].key;
        const nextTaskNumber = updatedProject.raw[0].nextTaskNumber;

        // 2. Validate sprint belongs to project (if provided)
        if (payload.sprintId) {
          const sprint = await transactionEntityManger.findOne(Sprint, {
            where: {
              id: payload.sprintId,
              projectId: payload.projectId 
            }
          });

          if (!sprint) {
            throw new BadRequestException(
              "Sprint does not exist or does not belong to this project",
            );
          }
        }

        // 3. Validate assignee
        if (payload.assigneeId) {
          const assignee = await transactionEntityManger.findOne(User, {
            where: {
              id: payload.assigneeId
            }
          });

          if (!assignee) {
            throw new BadRequestException("Assignee not found");
          }
        }
        // 4. Create task
        const task =  transactionEntityManger.create(Task, {
          title: payload.title,
          reporterId: payload.reporterId,
          projectId: payload.projectId,
          assigneeId: payload.assigneeId,
          sprintId: payload.sprintId,
          taskNumber: nextTaskNumber-1,
          issueKey: `${projectKey}-${nextTaskNumber-1}`,
        ...(payload.taskType ? { taskType: payload?.taskType} :  { }),
  
        })

        return await transactionEntityManger.save(Task, task)
    
      })
    
    } catch (error) {
      this.logger.error('Error to create a task', error);
      throw error;
    }
  }
}
