import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import tokenConfig from '../configs/token';

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

  if (!authorization) throw new Error('User without permission');

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, tokenConfig.secretKey);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid token');
  }
};

export default ensureAuthentication;
