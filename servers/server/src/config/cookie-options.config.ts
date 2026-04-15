import { CookieOptions } from 'express';

export const cookieOption = (minutes: number): CookieOptions => {
  return {
    httpOnly: true,
    secure: false, // true in production
    sameSite: 'lax',
    maxAge: minutes * 60 * 1000, // minutes → ms
    path: '/',
  };
};
