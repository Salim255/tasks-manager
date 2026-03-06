import { INestApplication } from '@nestjs/common';
import morgan from 'morgan';

export function morganConfig(app: INestApplication) {
  app.use(morgan('dev'));
}
