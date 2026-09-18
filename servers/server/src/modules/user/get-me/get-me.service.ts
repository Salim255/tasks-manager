import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class GetMeService {
  private logger = new Logger(GetMeService.name);
  constructor(@Inject(USER_REPOSITORY) private userRepo: Repository<User>) {}

  getMe({userId}: { userId: string }): Promise<User | null> {
    try {
      return this.userRepo.findOne({ where: { id: userId } });
    } catch (error) {
      this.logger.error('Error fetching user by ID', error);
      throw error;
    }
  }
}
