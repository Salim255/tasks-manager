import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto, RegisterResponseDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import express from 'express';
import { ConfigService } from '@nestjs/config';
import { cookieOption } from 'src/config/cookie-options.config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account and returns user info + tokens.',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already registered.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<RegisterResponseDto> {
    const result = await this.authService.register(dto);

    // Cookie expiration value
    const JWT_COOKIE_EXPIRE_IN = parseInt(
      this.configService.get<string>('JWT_COOKIE_EXPIRE_IN') || '90',
      10, // Base
    );

    // Built cookie options
    const cookieOptions = cookieOption(JWT_COOKIE_EXPIRE_IN);

    // Attach a cookie to an outgoing response
    response.cookie('task-m-jwt', result.tokens.accessToken, cookieOptions);
    return {
      status: 'success',
      data: result,
    };
  }
}
