import { Module } from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { ProfileRepository } from './repository/profile.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ProfileController } from './controller/profile.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
