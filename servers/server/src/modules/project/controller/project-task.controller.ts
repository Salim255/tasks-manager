import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
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
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import {
  CreateTaskDto,
  CreateTaskResponseDto,
  TasksListResponseDto,
} from 'src/modules/task/dto/task.dto';

import { TaskService } from 'src/modules/task/service/task.service';
import { Task } from 'src/modules/task/entity/task.entity';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('projects')
export class ProjectTaskController {
  constructor(private taskService: TaskService) {}



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
    req: Request & { 
      user: { 
        id: string, 
        demoClientId: string | null, 
        isDemo: boolean | null 
      }; 
      refresh_token: { token: string } 
    },
  ) {
    const { id: userId } = req.user;
    const { title, taskType, sprintId, dueAt, priority } = dto;

    if (!userId || !title || !taskType) {
      throw new BadRequestException('Missing required fields');
    }
    const task: Task = await this.taskService.createTask({
      title,
      projectId,
      dueAt: dueAt ?? null,
      priority: priority ?? undefined,
      sprintId,
      taskType,
      reporterId: userId,
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
  async getTasksByProject(
    @Param('projectId') projectId: string,
    @Req()
    req: Request & { 
      user: { 
        id: string, 
        demoClientId: string | null, 
        isDemo: boolean | null 
      }; 
      refresh_token: { token: string } 
    },): Promise<TasksListResponseDto> {
    const { id: userId, isDemo, demoClientId } = req.user;

    if (!projectId) {
      throw new BadRequestException('ProjectId needed to fetch project');
    }

    const tasks = await this.taskService.getTasksByProject({ projectId });

    return {
      status: 'success',
      data: { tasks },
    };
  }
}
