import { INestApplication } from '@nestjs/common';
import morgan from 'morgan';

export function morganConfig(app: INestApplication) {
  console.log('hello');
  app.use(morgan('dev'));
}
