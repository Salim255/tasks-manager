import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { cookieOption } from 'src/config/cookie-options.config';

@Injectable()
export class TokenCookieService {
  constructor(private config: ConfigService) {}

  setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProd = this.config.get<string>('NODE_ENV') === 'production';
    const accessExpire = parseInt(
      this.config.get('JWT_ACCESS_COOKIE_EXPIRE_IN') || '15',
      10,
    );

    const refreshExpire = parseInt(
      this.config.get('JWT_REFRESH_COOKIE_EXPIRE_IN') || '10080',
      10,
    );

    const accessOptions = cookieOption(accessExpire, isProd);
    const refreshOptions = cookieOption(refreshExpire, isProd);

    response.cookie('task_m_access_jwt', accessToken, accessOptions);
    response.cookie('task_m_refresh_jwt', refreshToken, refreshOptions);
  }

  clearAuthCookies(response: Response) {
    response.clearCookie('task_m_access_jwt');
    response.clearCookie('task_m_refresh_jwt');
  }
}
