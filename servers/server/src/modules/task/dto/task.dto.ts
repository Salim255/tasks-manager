import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
