import { Module } from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { ProfileRepository } from './repository/profile.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
