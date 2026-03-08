import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateSprintDto, SprintResponseDto } from '../dto/sprint.dto';

import { SprintService } from './sprint.service';

@ApiTags('Sprints')
@Controller('sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new sprint',
    description:
      'Creates a sprint under a specific project. Each sprint must belong to exactly one project.',
  })
  @ApiBody({
    type: CreateSprintDto,
    examples: {
      basic: {
        summary: 'Basic sprint creation',
        value: {
          name: 'Sprint 1',
          status: 'planned',
          startDate: '2026-03-10T00:00:00.000Z',
          endDate: '2026-03-20T00:00:00.000Z',
          projectId: '7d975331-af42-4db5-83e1-bf157b922e18',
        },
      },
    },
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
  async createSprint(@Body() dto: CreateSprintDto): Promise<SprintResponseDto> {
    return await this.sprintService.createSprint(dto);
  }
}
