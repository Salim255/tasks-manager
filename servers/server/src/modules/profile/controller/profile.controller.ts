import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CreateProfileDto } from '../dto/profile.dto';
import { ProfileService } from '../service/profile.service';

@Controller('Profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

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
    type: CreateProfileResponseDto,
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
  ): Promise<CreateProfileResponseDto> {
    const {lastName, firstName} = dto;
    return this.profileService.create(dto);
  }
}
