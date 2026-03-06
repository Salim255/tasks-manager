import { Injectable, ConflictException, Inject, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dto/auth.dto';
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

  async register(dto: RegisterDto) {
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

      const tokens = this.jwtService.createToken(user?.id);

      return { user, tokens: { accessToken: tokens, refreshToken: tokens } };
    } catch (error) {
      this.logger.error('Failed to register user', error);

      throw error;
    }
  }
}
