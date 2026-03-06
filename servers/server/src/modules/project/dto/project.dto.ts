import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entity/project.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export class ProjectsListResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    example: {
      projects: [
        {
          id: 1,
          name: 'Task Manager',
          description: 'A modern task management application',
          status: 'active',
          ownerId: 12,
          createdAt: '2024-03-05T12:00:00.000Z',
          updatedAt: '2024-03-05T12:00:00.000Z',
        },
      ],
    },
  })
  data: {
    projects: Project[];
  };
}
