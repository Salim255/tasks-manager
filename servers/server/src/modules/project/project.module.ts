import { Module } from '@nestjs/common';
import { ProjectService } from './service/project.service';
import { ProjectRepository } from './repository/project.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
