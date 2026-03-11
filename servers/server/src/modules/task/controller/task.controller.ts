import {
  Body,
  Controller,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import {
  CreateTaskDto,
  CreateTaskResponseDto,
  UpdateTaskSprintDto,
  UpdateTaskSprintResponseDto,
} from '../dto/task.dto';
import { Task } from '../entity/task.entity';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';

@ApiTags('Tasks')
@Controller('projects/:projectId/tasks')
export class TaskController {
  private logger = new Logger(TaskController.name);

  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':taskId/sprint')
  @ApiOperation({
    summary: 'Update the sprint of a task',
    description:
      'Assigns a task to a sprint or removes it from a sprint. Send `null` to remove the task from any sprint.',
  })
  @ApiParam({
    name: 'taskId',
    required: true,
    description: 'The ID of the task to update',
    example: '1960e80a-fb58-40fe-aa22-cbe6e2edf5bc',
  })
  @ApiBody({ type: UpdateTaskSprintDto })
  @ApiResponse({
    status: 200,
    description: 'Task sprint updated successfully.',
    type: UpdateTaskSprintResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request — validation failed.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — missing or invalid authentication token.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task or sprint not found.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ApiErrorResponseDto,
  })
  async updateTaskSprint(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskSprintDto,
    @Req() req: Request & { user: { id: string } },
  ): Promise<UpdateTaskSprintResponseDto> {
    const { id: userId } = req.user;

    const task = await this.taskService.updateTaskSprint({
      taskId,
      sprintId: dto.sprintId,
      userId,
    });

    return {
      status: 'success',
      data: { task },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
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
}
