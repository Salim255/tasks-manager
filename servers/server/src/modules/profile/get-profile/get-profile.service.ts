import { Inject, Injectable, Logger } from '@nestjs/common';
import { PROFILE_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';

@Injectable()
export class GetProfileService {
  private logger = new Logger(GetProfileService.name);
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRepo: Repository<Profile>,
  ) {}

  async getUserProfile(payload: { userId: string }): Promise<Profile> {
    try {
      const query = `
        SELECT * FROM profiles  AS pr
          WHERE pr."userId" = $1;
      `;
      const values = [payload.userId];
      const profile: Profile[] = await this.profileRepo.query(query, values);
      return profile[0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
