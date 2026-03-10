import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Task } from '../entity/task.entity';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'bug' | 'story';

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
