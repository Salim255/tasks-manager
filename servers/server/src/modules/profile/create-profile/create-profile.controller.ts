import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
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
  CreateProfileDto,
  CreateProfileResponse,
} from '../dto/profile.dto';
import { CreateProfileService } from './create-profile.service';
import { Profile } from '../entity/profile.entity';
import { Request } from 'express';

@ApiTags('Projects')
@Controller('Profiles')
export class CreateProfileController {
  constructor(
    private createProfileService: CreateProfileService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new profile',
    description:
      'Creates a user profile using first name and last name for the authenticated user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully.',
    type: CreateProfileResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'A profile for this user already exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createProfile(
    @Body() dto: CreateProfileDto,
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ): Promise<CreateProfileResponse> {
    const { id: userId } = req.user;
    const { lastName, firstName } = dto;
  
    const profile: Profile = await this.createProfileService.create({
      lastName,
      firstName,
      userId,
    });

    return {
      status: 'success',
      data: {
        profile: profile,
      },
    };
  }
}
