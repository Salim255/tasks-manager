import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { morganConfig } from './config/morgan.config';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/errors/global.error';
import { corsConfig } from './config/cors.config';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  const logger = new Logger('Bootstrap');

  // Initialize Cors config
  corsConfig(app);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());

  // Initialize Swagger
  setupSwagger(app);

  morganConfig(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      enableDebugMessages: true,
      exceptionFactory: (errors) => {
        console.log(JSON.stringify(errors, null, 2)); // <-- ADD THIS
        return new BadRequestException(errors);
      },
    }),
  );

  // Errors handlers
  // Register http exception errors handler
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new GlobalExceptionFilter(configService));

  await app.listen(PORT, '127.0.0.1');
  logger.log(`Task manager's, server running... on port number: ✅`, `${PORT}`);
}

bootstrap().catch((error) => {
  console.log(error);
  process.exit(1);
});
