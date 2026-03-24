import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';
import { MemberRepository } from './repository/member.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
