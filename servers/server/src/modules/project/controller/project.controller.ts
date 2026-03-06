import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto, CreateProjectResponseDto, ProjectsListResponseDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';
import { ProjectService } from '../service/project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new project',
    description: 'Creates a new project for the authenticated user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully.',
    type: CreateProjectResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'Project with this name already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createProject(
    @Body() body: CreateProjectDto,
    @Req() req: any,
  ): Promise<CreateProjectResponseDto> {
    // const userId = req.user;
    const { name, description } = body;
    if (!name || !description) {
      throw new BadRequestException(
        'Project must have both name and description',
      );
    }

    const project = await this.projectService.createProject({
      name,
      description,
    });

    return {
      status: 'success',
      data: {
        project,
      },
    };
  }

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
