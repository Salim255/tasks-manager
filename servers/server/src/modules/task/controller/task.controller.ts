import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
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
import { CreateTaskDto, CreateTaskResponseDto } from '../dto/task.dto';
import { Task } from '../entity/task.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

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
