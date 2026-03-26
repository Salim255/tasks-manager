import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateProjectDto,
  CreateProjectResponseDto,
  ProjectDto,
  ProjectDtoResponse,
  ProjectsListResponseDto,
} from '../dto/project.dto';
import { Project } from '../entity/project.entity';
import { ProjectService } from '../service/project.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import {
  CreateTaskDto,
  CreateTaskResponseDto,
  TasksListResponseDto,
} from 'src/modules/task/dto/task.dto';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';
import { TaskService } from 'src/modules/task/service/task.service';
import {
  SprintResponseDto,
  SprintsListResponseDto,
} from 'src/modules/sprint/dto/sprint.dto';
import { Task } from 'src/modules/task/entity/task.entity';
import { SprintService } from 'src/modules/sprint/service/sprint.service';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private sprintService: SprintService,
    private taskService: TaskService,
    private projectService: ProjectService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  @ApiOperation({
    summary: 'Fetch a single project',
    description:
      'Fetches a single project along with its tasks, sprints, members (with profile), and owner. Requires authentication via HttpOnly session cookie.',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of the project to fetch',
    example: '3d660f2d-5653-4b8c-9ecc-b4497ff64a06',
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully fetched',
    type: ProjectDtoResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async getProject(
    @Param('projectId') projectId: string,
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<ProjectDtoResponse> {
    const { id: userId } = req.user;

    if (!userId || !projectId) {
      throw new BadRequestException('Fetch project data required');
    }
    const project: ProjectDto = await this.projectService.getProjectById({
      projectId,
      userId,
    });

    return {
      status: 'success',
      data: {
        project: project,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':projectId/sprints')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new sprint',
    description:
      'Creates a sprint under a specific project. Each sprint must belong to exactly one project.',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of the project where the sprint will be created',
    example: 'a3f1c2b4-9d12-4e8f-8b1a-123456789abc',
  })
  @ApiResponse({
    status: 201,
    description: 'Sprint created successfully',
    type: SprintResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid payload or missing required fields',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async createSprint(
    @Param('projectId') projectId: string,
  ): Promise<SprintResponseDto> {
    const sprint: Sprint = await this.sprintService.createSprint({ projectId });
    return {
      status: 'success',
      data: {
        sprint,
      },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':projectId/tasks')
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Creates a new task inside the specified project. Requires authentication via HttpOnly session cookie.',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of the project where the task will be created',
    example: 'a3f1c2b4-9d12-4e8f-8b1a-123456789abc',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Task creation payload',
  })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found',
  })
  async createTask(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDto,
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ) {
    const { id: userId } = req.user;
    const { title, taskType } = dto;

    if (!userId || !title || !taskType) {
      throw new BadRequestException('Missing required fields');
    }
    const task: Task = await this.taskService.createTask({
      title,
      projectId,
      taskType,
      ownerId: userId,
    });
    const response: CreateTaskResponseDto = {
      status: 'success',
      data: {
        task,
      },
    };
    return response;
  }

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

    if (!name) {
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

    if (!projectId) {
      throw new BadRequestException('ProjectId needed to fetch project');
    }

    const tasks = await this.taskService.getTasksByProject({ projectId });

    return {
      status: 'success',
      data: { tasks },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':projectId/sprints')
  @ApiOperation({
    summary: 'Get all sprints for a project',
    description:
      'Returns a list of all sprints belonging to the specified project for the authenticated user.',
  })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'The ID of the project whose sprints will be retrieved.',
    example: '3d660f2d-5653-4b8c-9ecc-b4497ff64a06',
  })
  @ApiResponse({
    status: 200,
    description: 'List of sprints retrieved successfully.',
    type: SprintsListResponseDto,
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
  async getSprintsByProject(
    @Param('projectId') projectId: string,
    @Req() req: Request & { user: { id: string } },
  ): Promise<SprintsListResponseDto> {
    const { id: userId } = req.user;

    const sprints = await this.sprintService.getSprintsByProject({
      projectId,
    });

    return {
      status: 'success',
      data: { sprints },
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
