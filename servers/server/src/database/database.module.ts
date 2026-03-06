import { Module } from '@nestjs/common';
import { DatabaseInitProvider } from './providers/database.init';
import { DatabaseOptionsProvider } from './providers/database.options';

@Module({
  providers: [DatabaseInitProvider, DatabaseOptionsProvider],
  exports: [DatabaseInitProvider],
})
export class DatabaseModule {}
