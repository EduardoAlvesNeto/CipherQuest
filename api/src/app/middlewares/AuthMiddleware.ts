import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '../helpers/ErrorHandler';
import TokenService from '../services/TokenService';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) throw new UnauthorizedError('User is not logged');

    const [, token] = authorization.split(' ');

    const data = TokenService.verifyToken(token);

    // if (!data) throw new UnauthorizedError('Invalid Token');

    const { id } = data as TokenPayload;

    req.userId = id;

    next();
  } catch (err) {
    next(err);
  }
}


export default AuthMiddleware;
