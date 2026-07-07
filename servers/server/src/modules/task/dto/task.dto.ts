import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Task } from '../entity/task.entity';

export class TaskDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string ;

  @ApiProperty({ enum: ['task', 'bug', 'story'] })
  taskType!: TaskType;

  @ApiProperty({ enum: ['todo', 'in_progress', 'done'] })
  status!: TaskStatus;

  @ApiPropertyOptional({ enum: ['low', 'medium', 'high']})
  priority!: TaskPriority;

  @ApiProperty()
  reporterId!: string;

  @ApiPropertyOptional({ nullable: true })
  assigneeId!: string | null;

  @ApiProperty()
  taskNumber!: number;

  @ApiProperty()
  issueKey!: string;

  @ApiProperty()
  projectId!: string;

  @ApiPropertyOptional({ nullable: true })
  sprintId!: string | null;

  @ApiPropertyOptional({ nullable: true })
  pointEstimate!: number | null;

  @ApiPropertyOptional({ nullable: true })
  dueAt!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: () => TaskUserDto })
  reporter!: TaskUserDto | null;

  @ApiPropertyOptional({ type: () => TaskUserDto, nullable: true })
  assignee!: TaskUserDto | null;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'bug' | 'story';

export class TaskUserDto {
  id!: string;
  profile!: UserProfileDto | null
}

export class UserProfileDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  avatarUrl!: string;
  bio!: string;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({
    example: 'Fix login bug',
    description: 'The new title of the task',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'in-progress',
    enum: ['todo', 'in-progress', 'done'],
  })
  @IsOptional()
  @IsString()
  status?: 'todo' | 'in-progress' | 'done';

  @ApiPropertyOptional({
    example: 'high',
    enum: ['low', 'medium', 'high'],
  })
  @IsOptional()
  @IsString()
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({
    example: '3d660f2d-5653-4b8c-9ecc-b4497ff64a06',
    nullable: true,
    description: 'The sprint ID to assign the task to. Use null to remove.',
  })
  @IsOptional()
  sprintId?: string | undefined;

  @ApiPropertyOptional({
    example: '1960e80a-fb58-40fe-aa22-cbe6e2edf5bc',
    description: 'The user ID of the new assignee. Use null to unassign.',
    nullable: true,
  })
  @IsOptional()
  assigneeId?: string;

  @ApiPropertyOptional({
    example: 'story',
    enum: ['story', 'bug', 'task'],
    description: 'Type of work item. Supported values are story, bug, and task.',
  })
  @IsOptional()
  @IsString()
  taskType?: TaskType;

  @ApiPropertyOptional({
    example: 'User forgot password on login page',
    description: 'Detailed description providing additional context about the task.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '2026-08-15T00:00:00.000Z',
    description: 'Due date and time by which the task should be completed (ISO 8601 format).',
  })
  @IsOptional()
  @IsString()
  dueAt?: string;
}

export class UpdateTaskSprintResponseDto {
  @ApiProperty({ example: 'success', enum: ['success', 'error'] })
  status!: 'success' | 'error';

  @ApiProperty({ type: () => Object })
  data!: {
    task: Task;
  };
}

export class UpdatedTaskResponseDto extends UpdateTaskSprintResponseDto {}

export class UpdateTaskSprintDto {
  @ApiProperty({
    example: '3d660f2d-5653-4b8c-9ecc-b4497ff64a06',
    nullable: true,
    description:
      'The ID of the sprint to assign the task to. Use null to remove the task from any sprint.',
  })
  @IsOptional()
  @IsString()
  sprintId?: string;
}

export class TasksListResponseDto {
  @ApiProperty({ example: 'success' })
  status?: 'success';

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
  data!: {
    tasks: Task[];
  };
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Fix login bug' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Error when clicking login button' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    enum: ['task', 'bug', 'story'],
  })
  @IsIn(['task', 'bug', 'story'])
  @IsNotEmpty()
  taskType!: TaskType;

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
  reporterId?: string;

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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dueAt!: string | null;
}

export class CreateTaskResponseDto {
  @ApiProperty({ example: 'success', enum: ['success', 'error'] })
  status!: 'success' | 'error';

  @ApiProperty({
    type: () => Task,
    description: 'The created task',
  })
  data!: {
    task: Task;
  };
}
