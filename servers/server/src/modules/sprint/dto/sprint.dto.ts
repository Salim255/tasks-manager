import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sprint } from '../entity/sprint.entity';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/modules/task/entity/task.entity';

export type SprintStatus = 'active' | 'completed' | 'planned' | 'upcoming';

export class UpdateSprintDto {
  @ApiPropertyOptional({
    example: 'Sprint 12',
    description: 'The new name of the sprint',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'active',
    enum: ['planned', 'active', 'completed'],
    description: 'The status of the sprint',
  })
  @IsOptional()
  @IsString()
  status?: 'planned' | 'active' | 'completed';

  @ApiPropertyOptional({
    example: '2026-03-10T00:00:00.000Z',
    description: 'The start date of the sprint',
  })
  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-03-20T00:00:00.000Z',
    description: 'The end date of the sprint',
  })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiPropertyOptional({
    example: '2026-03-21T00:00:00.000Z',
    description: 'The completion date of the sprint',
  })
  @IsOptional()
  @IsISO8601()
  completeDate?: string;
}

export class SprintsListResponseDto {
  @ApiProperty({ example: 'success', enum: ['success', 'error'] })
  status: 'success' | 'error';

  @ApiProperty({ type: () => Object })
  data: {
    sprints: Sprint & { tasks: Task[] }[];
  };
}

export class CreateSprintDto {
  @ApiProperty({
    example: '7d975331-af42-4db5-83e1-bf157b922e18',
    description: 'Project this sprint belongs to',
  })
  @IsNotEmpty()
  projectId: string;
}

export class SprintDataDto {
  @ApiProperty({ type: () => Sprint })
  sprint: Sprint;
}

export class SprintResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    type: () => SprintDataDto,
  })
  data: SprintDataDto;
}

export class UpdateSprintResponseDto extends SprintResponseDto {}
