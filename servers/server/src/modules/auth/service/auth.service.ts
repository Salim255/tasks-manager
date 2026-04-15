import {
  Injectable,
  ConflictException,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto, DataDto } from '../dto/auth.dto';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { JwtTokenService } from './jwt.token.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtTokenService,
    @Inject(USER_REPOSITORY) private userRepo: Repository<User>,
  ) {}

  async validateSession(payload: {
    userId: string;
    refreshToken: string;
  }): Promise<DataDto> {
    try {
      const user: User | null = await this.userRepo.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check if token matches stored hash
      if (user.refreshTokenHash) {
        const isValid = await bcrypt.compare(
          payload.refreshToken,
          user.refreshTokenHash,
        );
        if (!isValid) {
          throw new UnauthorizedException('Session token mismatch');
        }
      }

      // Generate new tokens
      const { accessToken, refreshToken } =
        await this.generateAndStoreTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      this.logger.error('Invalid or expired session token', error);
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<DataDto> {
    try {
      const user = await this.userRepo.findOne({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const { accessToken, refreshToken } =
        await this.generateAndStoreTokens(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt,
        },
        tokens: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      this.logger.error('Failed to login user', error);
      throw error;
    }
  }

  async register(dto: RegisterDto): Promise<DataDto> {
    try {
      const existing = await this.userRepo.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new ConflictException('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const query = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING email, role, "emailVerified", id, "createdAt";
      `;

      const values = [dto.email, hashedPassword];
      const user: User = await this.userRepo.query(query, values);

      const { accessToken, refreshToken } =
        await this.generateAndStoreTokens(user);

      return { user, tokens: { accessToken, refreshToken } };
    } catch (error) {
      this.logger.error('Failed to register user', error);

      throw error;
    }
  }

  private async generateAndStoreTokens(user: User) {
    const accessToken = this.jwtService.generateAccessToken(user.id);
    const refreshToken = this.jwtService.generateRefreshToken(user.id);

    // Hash refresh token
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    // Store hash in DB
    await this.userRepo.update(user.id, { refreshTokenHash });

    return {
      accessToken,
      refreshToken,
    };
  }
}
