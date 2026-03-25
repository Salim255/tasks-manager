import {
  Body,
  Controller,
  Post,
  UseGuards,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ApiErrorResponseDto } from 'src/common/interfaces/shared.interface';
import { Member } from '../entity/member.entity';
import { MemberService } from '../service/member.service';
import { CreateMemberDto } from '../dto/member.dto';
import { UserService } from 'src/modules/user/service/user.service';
import { User } from 'src/modules/user/entity/user.entity';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  private logger = new Logger(MemberController.name);

  constructor(
    private userService: UserService,
    private readonly memberService: MemberService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Add a user to a project',
    description:
      'Creates a new project member entry linking a user to a project with a specific role. Only project admins should be allowed to perform this action.',
  })
  @ApiBody({ type: CreateMemberDto })
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
  async createProjectMember(@Body() dto: CreateMemberDto): Promise<Member> {
    const { email, projectId, role } = dto;
    if (!email || !projectId || !role) {
      throw new BadRequestException('Project member data  missing');
    }
    const user: User | null = await this.userService.getUserByEmail({ email });
    if (!user) {
      throw new BadRequestException('User not exist with the given email');
    }
    return this.memberService.create({ userId: user.id, projectId, role });
  }
}
