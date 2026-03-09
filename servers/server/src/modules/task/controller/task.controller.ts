import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../service/task.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @ApiBody({})
  @ApiResponse({})
  async createTask(){

  }
}
