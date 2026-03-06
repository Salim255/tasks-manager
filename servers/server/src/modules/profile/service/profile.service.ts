import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(@Inject(PROFILE_REPOSITORY) profileRepo: Repository<Profile>) {}
}
