import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { jwtConfig } from '@config/index';
import HttpException from '@shared/errors/HttpException';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function checkAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new HttpException('JWT token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, jwtConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      email: 'string',
    };

    return next();
  } catch {
    throw new HttpException('Invalid JWT token', 401);
  }
}
