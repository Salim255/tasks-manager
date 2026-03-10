import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateProjectDto,
  CreateProjectResponseDto,
  ProjectsListResponseDto,
} from '../dto/project.dto';
import { Project } from '../entity/project.entity';
import { ProjectService } from '../service/project.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { TasksListResponseDto } from 'src/modules/task/dto/task.dto';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';
import { TaskService } from 'src/modules/task/service/task.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<CreateProjectResponseDto> {
    const { id: userId } = req.user;
    //const { token } = req.refresh_token;
    const { name, description } = body;

    if (!name || !description) {
      throw new BadRequestException(
        'Project must have both name and description',
      );
    }

    const project = await this.projectService.createProject({
      name,
      description,
      ownerId: userId,
    });

    return {
      status: 'success',
      data: {
        project,
      },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':projectId/tasks')
  @ApiOperation({
    summary: 'Get all tasks for a project',
    description:
      'Returns a list of all tasks belonging to the specified project for the authenticated user.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'The ID of the project whose tasks will be retrieved.',
    example: '8deb02d6-6dd0-409b-911e-d2ab709f34e2',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
    type: TasksListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — missing or invalid authentication token.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ApiErrorResponseDto,
  })
  async getTasksByProject(
    @Param('projectId') projectId: string,
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<TasksListResponseDto> {
    const { id: userId } = req.user;

    const tasks = await this.taskService.getTasksByProject({ projectId });

    return {
      status: 'success',
      data: { tasks },
    };
  }

  @Get('/all')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  async getProjectsByUser(
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<ProjectsListResponseDto> {
    const { id: userId } = req.user;
    const projects: Project[] = await this.projectService.getUserProjectsByUser(
      { ownerId: userId },
    );

    const response: ProjectsListResponseDto = {
      status: 'success',
      data: {
        projects: projects,
      },
    };

    return response;
  }
}
