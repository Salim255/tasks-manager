import { Module } from '@nestjs/common';
import { CreateProfileService } from './create-profile/create-profile.service';
import { ProfileRepository } from './repository/profile.repository';
import { DatabaseModule } from 'src/database/database.module';
import { CreateProfileController } from './create-profile/create-profile.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [CreateProfileService, ProfileRepository],
  controllers: [CreateProfileController],
})
export class ProfileModule {}
