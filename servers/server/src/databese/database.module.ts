import { Module } from '@nestjs/common';
import { DatabaseInitProvider } from './providers/database.init';
import { DatabaseOptionsProvider } from './providers/database.options';

@Module({
  providers: [DatabaseInitProvider, DatabaseOptionsProvider],
})
export class DatabaseModule {}
