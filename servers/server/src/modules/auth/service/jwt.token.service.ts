import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export type JwtTokenPayload = {
  id: string;
  exp: number;
};

@Injectable()
export class JwtTokenService {
  private logger = new Logger(JwtTokenService.name);

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  createToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
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

  decodedToken(token: string): JwtTokenPayload {
    return this.jwtService.decode(token);
  }

  prepareToken(userId: string): JwtTokenPayload & { token: string } {
    const token = this.createToken(userId);
    const tokenDetails: JwtTokenPayload | null = this.verifyToken(token);
    if (!tokenDetails) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return { token, ...tokenDetails };
  }
}
