import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { GetUserService } from '../get-user/get-user.service';

@Injectable()
export class GetMeService {
  private logger = new Logger(GetMeService.name);
  constructor(private getUserService: GetUserService) {}

  getMe({ userId }: { userId: string }): Promise<User | null> {
    try {
      return this.getUserService.getUserById({ id: userId });
    } catch (error) {
      this.logger.error('Error fetching user by ID', error);
      throw error;
    }
  }
}
