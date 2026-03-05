import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectModule } from './modules/project/project.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    TaskModule,
    SprintModule,
    ProjectModule,
    ProfileModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
