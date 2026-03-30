import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Param,
  Patch,
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
  UpdatedTaskResponseDto,
  UpdateTaskDto,
  UpdateTaskSprintDto,
  UpdateTaskSprintResponseDto,
} from '../dto/task.dto';
import { Task } from '../entity/task.entity';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';

@ApiTags('Tasks')
@Controller('tasks')
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
    const { sprintId } = dto;

    if (!taskId) {
      throw new BadRequestException('Task ID is required');
    }

    const updatedTask: Task = await this.taskService.updateTaskSprint({
      taskId,
      sprintId,
    });
    return {
      status: 'success',
      data: { task: updatedTask },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':taskId')
  @ApiOperation({
    summary: 'Update a task by its ID',
    description:
      'Updates any editable fields of a task. Only the fields provided in the body will be updated.',
  })
  @ApiParam({
    name: 'taskId',
    required: true,
    description: 'The ID of the task to update',
    example: '71d008a6-2beb-46a9-9a4f-5bfd94f9625b',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
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
    description: 'Task not found.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ApiErrorResponseDto,
  })
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: Request & { user: { id: string } },
  ): Promise<UpdatedTaskResponseDto> {
    const { id: userId } = req.user;
    const { title, description, priority, status } = dto;
    const task = await this.taskService.updateTask({
      title,
      description,
      priority,
      status,
      taskId: taskId,
    });

    return {
      status: 'success',
      data: { task },
    };
  }
}
