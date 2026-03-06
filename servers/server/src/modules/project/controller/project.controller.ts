import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from '../dto/project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  @Get()
  @ApiOperation({
    summary: 'Get all projects',
    description:
      'Returns a list of all projects belonging to the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully.',
    type: ProjectResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — missing or invalid authentication token.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getProjects(): Promise<ProjectResponseDto[]> {
    // Example mock — replace with service call
    return [
      {
        id: 1,
        name: 'Task Manager',
        description: 'A modern task management application',
        status: 'active',
        ownerId: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}