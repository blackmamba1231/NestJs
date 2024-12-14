// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    if (!req.headers.authorization) {
      throw new Error('Unauthorized');
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    req['userToken'] = token;
    next();
  }
}
