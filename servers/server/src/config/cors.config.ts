import { INestApplication } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function corsConfig(app: INestApplication) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://comparable-clips-horses-agent.trycloudflare.com',
    'https://web.kundul.app',
    'capacitor://localhost',
    'capacitor://localhost',
  ];
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, (origin as any) || true);
      } else {
        callback(new Error(`Origin not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // This middleware handles CORS preflight requests, which are sent by browsers as
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Checks if the incoming request is a preflight CORS request
    if (req.method === 'OPTIONS') {
      // Sets the Access-Control-Allow-Origin header to the request's origin.
      // If no origin is provided, it defaults to * (allow all).
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      // Tells the browser which HTTP methods are allowed for cross-origin requests
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      // Specifies which headers the browser can include in the actual request.
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // Sends a 200 OK response to the browser, confirming that the preflight check passed.
      res.sendStatus(200);
    } else {
      next();
    }
  });
}
