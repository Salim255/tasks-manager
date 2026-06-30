/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack: string | undefined = undefined;

    // If it's a NestJS HttpException → extract status + message
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message = typeof res === 'string' ? res : (res as any).message || message;
    }

    // PostgreSQL duplicate key
    if (exception instanceof QueryFailedError) {
      const error = exception as QueryFailedError & {
          driverError: {
            code: string;
            detail?: string;
            constraint?: string;
          };
        };
      
      statusCode = 409;
    
      const detail = error.driverError.detail;

      message = 'Resource already exists.';

      if (detail) {
          const match = detail.match(/\((.*?)\)=\((.*?)\)/);

          if (match) {
              const field = match[1];
              const value = match[2];

              message = `${field} '${value}' already exists.`;
          }
      }
    }

    // If it's a generic JS error → use its message
    if (exception instanceof Error) {
      if (isDev) {
        stack = exception.stack;
      }
    }

    // Log the real error internally
    this.logger.error(
      `Error on ${request.method} ${request.url}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (exception as any)?.stack || exception,
    );

    // Final unified API response
    response.status(statusCode).json({
      status: 'error',
      message,
      data: null,
      ...(isDev && stack ? { stack } : {}), // only include stack in dev
    });
  }
}
