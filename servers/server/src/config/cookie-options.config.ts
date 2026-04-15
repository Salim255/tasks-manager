import { CookieOptions } from 'express';

export const cookieOption = (
  minutes: number,
  isProd: boolean,
): CookieOptions => {
  return {
    httpOnly: true,
    secure: isProd, // true in production
    sameSite: isProd ? 'lax' : 'strict', // 'lax' in production, 'strict' in development
    maxAge: minutes * 60 * 1000, // minutes → ms
    path: '/',
  };
};
