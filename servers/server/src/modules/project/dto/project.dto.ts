import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entity/project.entity';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Task } from 'src/modules/task/entity/task.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Member } from 'src/modules/member/entity/member.entity';
import { Profile } from 'src/modules/profile/entity/profile.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export class ProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: () => [Task] })
  tasks: Task[];

  @ApiProperty({ type: () => [Sprint] })
  sprints: Sprint[];

  @ApiProperty({ type: () => [Member] })
  members: Member[];

  @ApiProperty({ type: () => Profile })
  owner: Profile;
}

export class CreateProjectResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    example: {
      project: {
        id: 1,
        name: 'Task Manager',
        description: 'A modern task management application',
        status: 'active',
        ownerId: 12,
        createdAt: '2024-03-05T12:00:00.000Z',
        updatedAt: '2024-03-05T12:00:00.000Z',
      },
    },
  })
  data: {
    project: Project;
  };
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Task Manager' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A modern task management application',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class ProjectsListResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({
    description: 'List of projects',
    type: () => Object, // <-- IMPORTANT
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
