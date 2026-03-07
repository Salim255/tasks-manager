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

    // 2 Fallback: check cookies (web apps)
    if (!token && this.extractTokenFromCookies(request)) {
      token = this.extractTokenFromCookies(request);
    }

    if (!token) return false;

    try {
      const decoded: JwtTokenPayload | null =
        this.jwtTokenService.verifyToken(token);
      // 4 Set decode as user in request
      if (!decoded) return false;

      request.user = { id: decoded.id };
      return true;
    } catch {
      return false;
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    // Type cast cookies as object with 'jwt' property for TypeScript safety
    const cookies = request.cookies as { jwt?: string } | undefined;
    return cookies?.jwt;
  }
}
