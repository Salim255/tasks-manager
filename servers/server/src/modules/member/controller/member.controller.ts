import { Body, Controller, Post, UseGuards, Req, Logger } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateProjectMemberDto } from '../dto/project-member.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';
import { Member } from '../entity/member.entity';
import { MemberService } from '../service/member.service';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  private logger = new Logger(MembersController.name);

  constructor(private readonly memberService: MemberService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Add a user to a project',
    description:
      'Creates a new project member entry linking a user to a project with a specific role. Only project admins should be allowed to perform this action.',
  })
  @ApiBody({ type: CreateProjectMemberDto })
  @ApiResponse({
    status: 201,
    description: 'Project member created successfully.',
    type: Member,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request — validation failed or user already in project.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — missing or invalid authentication token.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Project or user not found.',
    type: ApiErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ApiErrorResponseDto,
  })
  async createProjectMember(
    @Body() dto: CreateProjectMemberDto,
    @Req() req: Request & { user: { id: string } },
  ): Promise<Member> {
    const { id: userId } = req.user;

    this.logger.log(
      `User ${userId} is adding user ${dto.userId} to project ${dto.projectId} with role ${dto.role}`,
    );

    return this.memberService.create(dto, userId);
  }
}
