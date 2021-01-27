import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import tokenConfig from '../configs/token';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response => {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('User without permission', 401);

  try {
    const [, token] = authorization.split(' ');

    const decodedToken = verify(token, tokenConfig.secretKey);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export default ensureAuthentication;
