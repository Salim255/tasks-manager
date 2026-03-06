export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Task Manager' })
  name: string;

  @ApiProperty({
    example: 'A modern task management application',
    required: false,
  })
  description?: string;

  @ApiProperty({ example: 'active', enum: ['active', 'archived'] })
  status: string;

  @ApiProperty({ example: 12 })
  ownerId: number;

  @ApiProperty({ example: '2024-03-05T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-05T12:00:00.000Z' })
  updatedAt: string;
}
