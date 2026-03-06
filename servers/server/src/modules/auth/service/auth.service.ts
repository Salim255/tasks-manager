import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dto/auth.dto';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { JwtTokenService } from './jwt.token.service';

@Injectable()
export class AuthService {
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
        INSERT INTO users (email, full_name, password)
        VALUES ($1, $2, $3)
        RETURNING id, email, full_name, created_at;
      `;

      const values = [dto.email, dto.fullName, hashedPassword];
      const user: User = await this.userRepo.query(query, values);

      const tokens = this.jwtService.createToken(user?.id);

      return { user, tokens };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
        throw new ConflictException('Email already registered');
      }

      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
