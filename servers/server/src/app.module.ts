import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectModule } from './modules/project/project.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './modules/member/Member.module';
import { APP_GUARD } from '@nestjs/core/constants';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';
//
@Module({
  imports: [
    MemberModule,
    TaskModule,
    SprintModule,
    ProjectModule,
    ProfileModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
