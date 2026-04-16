import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export type JwtTokenPayload = {
  sub: string; // user ID
  exp: number; // expiration timestamp (auto-added by JWT library)
};

export interface AuthCookies {
  task_m_access_jwt?: string;
  task_m_refresh_jwt?: string;
}

@Injectable()
export class JwtTokenService {
  private logger = new Logger(JwtTokenService.name);

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private getValue<T>(key: string, fb: T): T {
    return this.configService.get<T>(key) ?? fb;
  }

  generateAccessToken(userId: string) {
    const jwtSecret = this.getValue('JWT_SECRET', '');
    const jwtExpiration = this.getValue('JWT_ACCESS_EXPIRATION', '15m');

    return this.jwtService.sign(
      { sub: userId },
      {
        secret: jwtSecret,
        expiresIn: jwtExpiration,
      },
    );
  }

  generateRefreshToken(userId: string) {
    const jwtSecret = this.getValue('JWT_SECRET', '');
    const jwtExpiration = this.getValue('JWT_REFRESH_EXPIRATION', '7d');

    return this.jwtService.sign(
      { sub: userId },
      {
        secret: jwtSecret,
        expiresIn: jwtExpiration,
      },
    );
  }

  verifyToken(token: string): JwtTokenPayload | null {
    try {
      const result: JwtTokenPayload = this.jwtService.verify(token);
      return result;
    } catch (err: any) {
      if (err instanceof Error) {
        this.logger.error('[JWT] Invalid token:', err.message);
      } else {
        this.logger.error('[JWT] Unknown JWT error');
      }
      return null;
    }
  }

  verifyAccessToken(token: string): JwtTokenPayload | null {
    return this.verifyToken(token);
  }

  verifyRefreshToken(token: string): JwtTokenPayload | null {
    return this.verifyToken(token);
  }

  decodedToken(token: string): JwtTokenPayload {
    return this.jwtService.decode(token);
  }
}
