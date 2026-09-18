import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class GetUserService {
  private logger = new Logger(GetUserService.name);
  constructor(@Inject(USER_REPOSITORY) private userRepo: Repository<User>) {}

  async getUserByEmail(payload: { email: string }): Promise<User | null> {
    try {
      const query = `
        SELECT * FROM users
        WHERE users.email = $1
        LIMIT 1;
      `;
      const user: User[] = await this.userRepo.query(query, [payload.email]);
      return user[0] ?? null;
    } catch (error) {
      this.logger.error('Error fetching user by email', error);
      throw error;
    }
  }

  getUserById({id}: { id: string }): Promise<User | null> {
    try {
      return this.userRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error('Error fetching user by ID', error);
      throw error;
    }
  }
}
