import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SprintRepository } from './repository/sprint.repository';
import { SprintService } from './service/sprint.service';
import { SprintController } from './controller/sprint.controller';

@Module({
  imports: [DatabaseModule],
  providers: [SprintRepository, SprintService],
  controllers: [SprintController],
})
export class SprintModule {}
