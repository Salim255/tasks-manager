import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginDto,
  LoginResponseDto,
  RefreshSessionResponseDto,
  RegisterDto,
  RegisterResponseDto,
  DataDto,
} from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import express from 'express';
import { ConfigService } from '@nestjs/config';
import { cookieOption } from 'src/config/cookie-options.config';
import { Logger } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { TokenCookieService } from '../service/token.cookie.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private tokenCookieService: TokenCookieService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Restore user session',
    description:
      'Validates the HttpOnly refresh_token cookie and returns the authenticated user. No request body required.',
  })
  @ApiCookieAuth('refresh_token')
  @ApiResponse({
    status: 200,
    description: 'Session restored successfully.',
    type: RefreshSessionResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired session cookie.',
  })
  async refreshSession(
    @Req()
    req: Request & { user: { id: string }; refresh_token: { token: string } },
  ) {
    //Sanitize and validate input
    const { id: userId } = req.user;
    const { token } = req.refresh_token;
    if (!userId || !token) {
      throw new BadRequestException('Missing user ID or refresh token');
    }
    //Get user
    const result: DataDto = await this.authService.validateSession({
      userId,
      refreshToken: token,
    });

    return {
      status: 'success',
      data: result,
    };
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user and returns user info + tokens.',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email or password.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<LoginResponseDto> {
    const { email, password } = body;
    const result = await this.authService.login({ email, password });

    // Cookie expiration value
    const JWT_COOKIE_EXPIRE_IN = parseInt(
      this.configService.get<string>('JWT_COOKIE_EXPIRE_IN') || '90',
      10, // Base
    );

    // Determine if we're in production environment
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    // Built cookie options
    const cookieOptions = cookieOption(JWT_COOKIE_EXPIRE_IN, isProd);
    // Attach a cookie to an outgoing response
    response.cookie('task_m_jwt', result.tokens.accessToken, cookieOptions);

    return {
      status: 'success',
      data: result,
    };
  }

  @Public()
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
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<RegisterResponseDto> {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const result = await this.authService.register({ email, password });

    // Set HttpOnly cookies for access and refresh tokens
    this.tokenCookieService.setAuthCookies(
      response,
      result.tokens.accessToken,
      result.tokens.refreshToken,
    );

    return {
      status: 'success',
      data: result,
    };
  }
}
