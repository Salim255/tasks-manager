import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

import { AuthModule } from '../auth/auth.module';
import { GetMeController } from './get-me/get-me-user.controller';
import { GetMeService } from './get-me/get-me.service';
import { GetUserService } from './get-user/get-user.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [GetMeService,GetUserService, UserRepository],
  controllers: [GetMeController],
  exports: [GetMeService, GetUserService],
})
export class UserModule {}
