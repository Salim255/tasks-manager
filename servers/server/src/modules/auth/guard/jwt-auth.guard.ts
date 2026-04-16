import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtTokenPayload, JwtTokenService } from '../service/jwt.token.service';
import { Reflector } from '@nestjs/core';

interface AuthenticatedRequest extends Request {
  cookies: {
    task_m_access_jwt?: string;
    task_m_refresh_jwt?: string;
  };
  user?: { id: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger(JwtAuthGuard.name);
  constructor(
    private readonly reflector: Reflector,
    private jwtTokenService: JwtTokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    // Reflector is a NestJS utility class that lets you read metadata added by decorators.
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      //The specific route handler method
      context.getHandler(),
      //The controller class that contains the route handler
      context.getClass(),
    ]);

    const allowRefresh = this.reflector.getAllAndOverride<boolean>(
      'allowRefresh',
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      if (allowRefresh) {
        this.tryInjectRefreshUser(request);
      }
      return true; // If the route is marked as public, allow access without authentication
    }

    const token: string | undefined = this.extractTokenFromCookies(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded: JwtTokenPayload | null =
        this.jwtTokenService.verifyAccessToken(token);
      // 4 Set decode as user in request
      if (!decoded) throw new UnauthorizedException('Invalid token');

      request.user = { id: decoded.sub };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    // Type cast cookies as object with 'jwt' property for TypeScript safety
    const cookies = request.cookies as
      | { task_m_access_jwt?: string }
      | undefined;
    return cookies?.task_m_access_jwt;
  }

  private tryInjectRefreshUser(request: AuthenticatedRequest) {
    const refreshToken = this.extractRefreshToken(request);
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');

    try {
      const decoded = this.jwtTokenService.verifyRefreshToken(refreshToken);
      if (!decoded) throw new UnauthorizedException('Invalid refresh token');
      request.user = { id: decoded.sub };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private extractRefreshToken(request: Request): string | undefined {
    const cookies = request.cookies as
      | { task_m_refresh_jwt?: string }
      | undefined;
    return cookies?.task_m_refresh_jwt;
  }
}
