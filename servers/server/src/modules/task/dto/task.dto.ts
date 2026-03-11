import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Task } from '../entity/task.entity';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'bug' | 'story';

export class UpdateTaskSprintResponseDto {
  @ApiProperty({ example: 'success', enum: ['success', 'error'] })
  status: 'success' | 'error';

  @ApiProperty({ type: () => Object })
  data: {
    task: Task;
  };
}

export class UpdateTaskSprintDto {
  @ApiProperty({
    example: '3d660f2d-5653-4b8c-9ecc-b4497ff64a06',
    nullable: true,
    description:
      'The ID of the sprint to assign the task to. Use null to remove the task from any sprint.',
  })
  @IsOptional()
  @IsString()
  sprintId: string | null;
}

export class TasksListResponseDto {
  @ApiProperty({ example: 'success' })
  status: 'success';

  @ApiProperty({
    description: 'List of tasks',
    type: () => Object, // <-- IMPORTANT
    example: {
      tasks: [
        {
          id: '1960e80a-fb58-40fe-aa22-cbe6e2edf5bc',
          title: 'Fix login bug',
          taskType: 'task',
          status: 'todo',
          projectId: '8deb02d6-6dd0-409b-911e-d2ab709f34e2',
        },
      ],
    },
  })
  data: {
    tasks: Task[];
  };
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Fix login bug' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Error when clicking login button' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    enum: ['task', 'bug', 'story'],
  })
  @IsIn(['task', 'bug', 'story'])
  @IsNotEmpty()
  taskType: TaskType;

  @ApiPropertyOptional({
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo',
  })
  @IsIn(['todo', 'in_progress', 'done'])
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: ['low', 'medium', 'high'],
  })
  @IsIn(['low', 'medium', 'high'])
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ownerId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  assigneeId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sprintId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  projectId?: string;
}

export class CreateTaskResponseDto {
  @ApiProperty({ example: 'success', enum: ['success', 'error'] })
  status: 'success' | 'error';

  @ApiProperty({
    type: () => Task,
    description: 'The created task',
  })
  data: {
    task: Task;
  };
}
