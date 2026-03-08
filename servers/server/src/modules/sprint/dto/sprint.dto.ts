import { ApiProperty } from '@nestjs/swagger';
import { Sprint } from '../entity/sprint.entity';

export type SprintStatus = 'active' | 'completed' | 'planned' | 'upcoming';

export class CreateSprintDto {
  @ApiProperty({
    example: '7d975331-af42-4db5-83e1-bf157b922e18',
    description: 'Project this sprint belongs to',
  })
  projectId: string;
}

export class SprintResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    type: () => SprintDataDto,
  })
  data: SprintDataDto;
}

export class SprintDataDto {
  @ApiProperty({ type: () => Sprint })
  sprint: Sprint;
}
