import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
} from '@nestjs/swagger';
import {
  CreateProjectDto,
  CreateProjectResponseDto,
  ProjectDto,
  ProjectDtoResponse,
  ProjectsListResponseDto,
} from '../dto/project.dto';
import { ProjectService } from '../service/project.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  @ApiOperation({
    summary: 'Fetch a single project',
    description:
      `Fetches a single project along with its tasks, sprints, members (with profile), 
      and owner. Requires authentication via HttpOnly session cookie.`,
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
  async getProject(
    @Param('projectId') projectId: string,
    @Req()
    req: Request & { 
      user: { 
        id: string, 
        demoClientId: string | null, 
        isDemo: boolean | null 
      };
      refresh_token: { token: string } 
    },): Promise<ProjectDtoResponse> {
    const { id: userId, isDemo } = req.user;

    if (!userId || !projectId) {
      throw new BadRequestException('Fetch project data required');
    }
    const project: ProjectDto | null = await this.projectService.getProjectById({
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
  async createProject(
    @Body() body: CreateProjectDto,
    @Req()
    req: Request & { 
      user: { 
        id: string, 
        demoClientId: string | null, 
        isDemo: boolean | null 
      }; 
      refresh_token: { token: string } 
    },
  ): Promise<CreateProjectResponseDto> {
    const { id: userId, isDemo, demoClientId } = req.user;
  
    const { name, key, description } = body;

    if (!name || !key) {
      throw new BadRequestException(
        'Project must have both name and key',
      );
    }

    const project = await this.projectService.createProject({
      name,
      key,
      description,
      demoClientId: demoClientId ? demoClientId : undefined,
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
 
  async getProjectsByUser(
    @Req()
    req: Request & {
      user: {
        id: string,
        demoClientId: string | null,
        isDemo: boolean | null 
      }; 
      refresh_token: { token: string }
    },

    @Query('include')
    include?: string,
  ): Promise<ProjectsListResponseDto> {
    const { id: userId, isDemo, demoClientId } = req.user;
    const dataToInclude = include?.split(',');
    const projects: ProjectDto[] = await this.projectService.getUserProjectsByUser(
      { ownerId: userId, relations: dataToInclude?.length ? dataToInclude : [] }
      
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
