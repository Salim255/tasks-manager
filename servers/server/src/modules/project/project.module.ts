import { Module } from '@nestjs/common';
import { ProjectService } from './service/project.service';
import { ProjectRepository } from './repository/project.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectController } from './controller/project.controller';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from '../task/task.module';
@Module({
  imports: [TaskModule, AuthModule, DatabaseModule],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
