import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  const logger = new Logger('Main');
  logger.log(`Task manager's, server running on port number: ✅`, `${PORT}`);
}

bootstrap().catch(() => {
  process.exit(1);
});
