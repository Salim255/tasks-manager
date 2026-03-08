import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtTokenPayload, JwtTokenService } from '../service/jwt.token.service';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
  refresh_token?: { token: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger(JwtAuthGuard.name);
  constructor(private jwtTokenService: JwtTokenService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    let token: string | undefined;

    // 1 First check Authorization header (native apps)
    const authHeader = request.headers.authorization;
    if (authHeader || authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  console.log(token, "Hello token from cookies👹👹👹2", request.cookies);
    // 2 Fallback: check cookies (web apps)
    if (!token && this.extractTokenFromCookies(request)) {
      token = this.extractTokenFromCookies(request);
      console.log(token, "Hello token from cookies👹👹👹")
    }

    if (!token) return false;

    try {
      const decoded: JwtTokenPayload | null =
        this.jwtTokenService.verifyToken(token);
      // 4 Set decode as user in request
      if (!decoded) return false;

      request.user = { id: decoded.id };
      request.refresh_token = { token };
      return true;
    } catch {
      return false;
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    // Type cast cookies as object with 'jwt' property for TypeScript safety
    const cookies = request.cookies as { task_m_jwt?: string } | undefined;
    return cookies?.task_m_jwt;
  }
}
