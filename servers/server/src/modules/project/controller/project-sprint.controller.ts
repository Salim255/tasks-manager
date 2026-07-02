import {
  BadRequestException,
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
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import {
  SprintResponseDto,
  SprintsListResponseDto,
} from 'src/modules/sprint/dto/sprint.dto';
import { SprintService } from 'src/modules/sprint/service/sprint.service';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('projects')
export class ProjectSprintController {
  constructor(private sprintService: SprintService) {}

 
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  async createSprint(
    @Param('projectId') projectId: string,

    @Req() req: Request & {
      user: { 
        id: string, 
        demoClientId: string | null,
        isDemo: boolean | null 
      }; 
      refresh_token: { token: string } 
    },
  ): Promise<SprintResponseDto> {
    const { id: userId } = req.user;

    if (!userId || !projectId) {
      console.log("UserId===",userId, "ProjectId", projectId)
      throw new BadRequestException('Fetch project data required');
    }

    const sprint: Sprint = await this.sprintService.createSprint({ projectId, creatorId: userId });
    return {
      status: 'success',
      data: {
        sprint,
      },
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
  async getSprintsByProject(
    @Param('projectId') projectId: string,
    @Req() req: Request & { 
      user: { 
        id: string,
        demoClientId: string | null,
        isDemo: boolean | null
      }; 
      refresh_token: { token: string } 
    },): Promise<SprintsListResponseDto> {
    const { id: userId, isDemo, demoClientId } = req.user;

    const sprints = await this.sprintService.getSprintsByProject({
      projectId,
    });

    return {
      status: 'success',
      data: { sprints },
    };
  }
}
