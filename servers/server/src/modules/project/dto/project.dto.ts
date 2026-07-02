import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entity/project.entity';
import { IsOptional, IsString, IsNotEmpty, IsUppercase, Length } from 'class-validator';
import { Task } from 'src/modules/task/entity/task.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Profile } from 'src/modules/profile/entity/profile.entity';
import { ApiResponseData } from 'src/common/interfaces/shared.interface';
import { TaskDto } from 'src/modules/task/dto/task.dto';

export class ProjectOwnerDto {
  id!: string;
  profile!: ProjectProfileDto | null
}

export class ProjectProfileDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  avatarUrl!: string;
  bio!: string;
}


export class ProjectMemberDto {
  id!: string;
  role!: string;
  userId!: string;
  profile?: ProjectProfileDto | null; 
}

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export class ProjectDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty({ type: () => [Task] })
  tasks?: TaskDto[];

  @ApiProperty({ type: () => [Sprint] })
  sprints?: Sprint[];

  @ApiProperty({ type: () => [ProjectMemberDto] })
  members?: ProjectMemberDto[];

  @ApiProperty({ type: () => Profile })
  reporter?: Profile;
}

export class ProjectDtoResponse extends ApiResponseData<{
  project: ProjectDto;
}> {}

export class CreateProjectResponseDto {
  @ApiProperty({ example: 'success' })
  status!: string;

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
  data!: {
    project: Project;
  };
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Task Manager' })
  @IsString()
  @IsNotEmpty()
  name!: string;


  @ApiProperty({ 
    example: 'DDD',
    maxLength: 8,
    minLength: 3
  })
  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  @Length(3, 8)
  key!: string;

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
  status!: string;

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
          owner: 12,
          createdAt: '2024-03-05T12:00:00.000Z',
          updatedAt: '2024-03-05T12:00:00.000Z',
        },
      ],
    },
  })
  data?: {
    projects: ProjectDto[];
  };
}
