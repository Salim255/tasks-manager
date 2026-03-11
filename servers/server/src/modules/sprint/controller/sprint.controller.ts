import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  SprintResponseDto,
  UpdateSprintDto,
  UpdateSprintResponseDto,
} from '../dto/sprint.dto';
import { SprintService } from '../service/sprint.service';
import { Sprint } from '../entity/sprint.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';

@ApiTags('Sprints')
@Controller('projects/:projectId/sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':sprintId')
  @ApiOperation({
    summary: 'Update a sprint by its ID',
    description:
      'Updates any editable fields of a sprint. Only the fields provided in the body will be updated.',
  })
  @ApiParam({
    name: 'sprintId',
    required: true,
    description: 'The ID of the sprint to update',
    example: '71d008a6-2beb-46a9-9a4f-5bfd94f9625b',
  })
  @ApiBody({ type: UpdateSprintDto })
  @ApiResponse({
    status: 200,
    description: 'Sprint updated successfully.',
    type: UpdateSprintResponseDto,
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
    description: 'Sprint not found.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ApiErrorResponseDto,
  })
  async updateSprint(
    @Param('sprintId') sprintId: string,
    @Body() body: UpdateSprintDto,
    @Req() req: Request & { user: { id: string } },
  ): Promise<UpdateSprintResponseDto> {
    const { id: userId } = req.user;
    const { completeDate, endDate, startDate, name, status } = body;
    const sprint = await this.sprintService.updateSprint({
      sprintId,
      completeDate,
      endDate,
      startDate,
      name,
      status,
    });

    return {
      status: 'success',
      data: { sprint },
    };
  }

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
