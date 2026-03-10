import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './controller/task.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
