import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsListResponseDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';
import { ProjectService } from '../service/project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all projects',
    description:
      'Returns a list of all projects belonging to the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully.',
    type: ProjectsListResponseDto,
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
  async getProjects(): Promise<ProjectsListResponseDto> {
    // Example mock — replace with service call
    const projects: Project[] = await this.projectService.getUserProjects();

    const response: ProjectsListResponseDto = {
      status: 'success',
      data: {
        projects: projects,
      },
    };

    return response;
  }
}
