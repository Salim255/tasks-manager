import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @ApiPropertyOptional({ default: 'task' })
  @IsString()
  @IsOptional()
  taskType: TaskType;

  @ApiPropertyOptional({ default: 'todo' })
  @IsString()
  @IsOptional()
  status?: TaskStatus;

  @IsString()
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
