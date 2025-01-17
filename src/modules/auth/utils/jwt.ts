import jwt from 'jsonwebtoken';
import { IPayloadToken } from '../interfaces';
import { BadRequestException } from '@nestjs/common';

export const generateTokensPair = async (
  payload: IPayloadToken,
  secret: string,
  access_expire: number,
  refresh_expire: number,
) => {
  const [access_token, refresh_token] = await Promise.all([
    jwt.sign(payload, secret, {
      algorithm: 'HS256',
      expiresIn: access_expire,
    }),
    jwt.sign({ id: payload.id }, secret, {
      algorithm: 'HS256',
      expiresIn: refresh_expire,
    }),
  ]);

  return { access_token, refresh_token };
};

export const verify = async (
  token: string,
  secret: string,
): Promise<IPayloadToken | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        reject(new BadRequestException('Invalid token'));
      } else {
        resolve(decoded as IPayloadToken);
      }
    });
  });
};
