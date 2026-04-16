import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { MeResponseDto } from '../dto/user.dto';
import { Request } from 'express';
import { UserService } from '../service/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get authenticated user',
    description:
      'Returns the currently authenticated user based on the access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    type: MeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized — missing or invalid access token.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getMe(
    @Req() req: Request & { user: { id: string } },
  ): Promise<MeResponseDto> {
    // req.user is injected by JwtAuthGuard after verifying the access token
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException(
        'Invalid or missing authentication token',
      );
    }

    // Fetch full user profile from DB
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
      },
    };
  }
}
