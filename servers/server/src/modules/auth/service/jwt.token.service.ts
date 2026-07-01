import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getEnvVar } from 'src/common/utils/utils';

export type JwtTokenPayload = {
  sub: string; // user ID
  demoClientId: string | null; // demo client ID
  exp: number; // expiration timestamp (auto-added by JWT library)
};

export type CreateTokenPayload = {
  userId: string;
  demoClientId: string | null;
  isDemo: boolean;
  tokenType: 'access' | 'refresh';
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

  private getTokenCredential(
    tokenType: 'access' | 'refresh'
  ): { secret: string; expiresIn: any } {
    if (tokenType === 'access') {
      return {
        secret: getEnvVar<string>('JWT_SECRET', '', this.configService),
        expiresIn: getEnvVar<string>('JWT_ACCESS_EXPIRATION', '15m', this.configService)
      };
    } else {
      return {
        secret: getEnvVar<string>('JWT_SECRET', '', this.configService),
        expiresIn: getEnvVar<string>('JWT_REFRESH_EXPIRATION', '7d', this.configService)
      };
    }
  }

  generateJwtToken({
      userId,
      demoClientId,
      isDemo,
      tokenType
    }: CreateTokenPayload) {
    const { secret, expiresIn } = this.getTokenCredential(tokenType);

    return this.jwtService.sign(
      { sub: userId, demoClientId: demoClientId, isDemo: isDemo },
      {
        secret: secret,
        expiresIn: expiresIn,
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
