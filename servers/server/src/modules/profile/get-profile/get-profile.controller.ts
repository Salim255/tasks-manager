import {
  BadRequestException,
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import {
  GetProfileResponse,
} from '../dto/profile.dto';
import { Profile } from '../entity/profile.entity';
import { Request } from 'express';
import { GetProfileService } from './get-profile.service';

@ApiTags('Projects')
@Controller('Profiles')
export class GetProfileController {
  constructor(private getProfileService: GetProfileService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get authenticated user profile',
    description:
      'Returns the profile information of the currently authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully.',
    type: GetProfileResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Missing or invalid authentication token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getProfile(
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<GetProfileResponse> {
    const { id: userId } = req.user;

    if (!userId) {
      throw new BadRequestException('Missing required fields');
    }
    const profile: Profile = await this.getProfileService.getUserProfile({
      userId,
    });

    return {
      status: 'success',
      data: { profile },
    };
  }
}