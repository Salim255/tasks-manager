import { Inject, Injectable, Logger } from '@nestjs/common';
import { PROFILE_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';
import { CreateProfileDto } from '../dto/profile.dto';

@Injectable()
export class ProfileService {
  private logger = new Logger(ProfileService.name);
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRepo: Repository<Profile>,
  ) {}

  async create(
    payload: CreateProfileDto & { userId: string },
  ): Promise<Profile> {
    try {
      const values = [payload.lastName, payload.lastName, payload.userId];
      const query = `
        INSERT INTO profiles ("lastName", "firstName", "userId")
          VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const profile: Profile[] = await this.profileRepo.query(query, values);
      return profile[0];
    } catch (error) {
      this.logger.error('Error to create profile', error);
      throw error;
    }
  }
}
