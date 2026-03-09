import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SprintResponseDto } from '../dto/sprint.dto';
import { SprintService } from '../service/sprint.service';
import { Sprint } from '../entity/sprint.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@ApiTags('Sprints')
@Controller('projects/:projectId/sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
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
}
