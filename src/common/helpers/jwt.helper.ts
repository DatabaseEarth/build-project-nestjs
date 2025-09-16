import jwt from 'jsonwebtoken';
import { PayloadToken, TokenSession } from '../interfaces';
import { BadRequestException } from '@nestjs/common';

export const generateTokensPair = async (
  access: { payload: PayloadToken; accessExpire: number },
  refresh: { payload: PayloadToken; refreshExpire: number },
  secret: string,
): Promise<TokenSession> => {
  const [accessToken, refreshToken] = await Promise.all([
    jwt.sign(access.payload, secret, {
      algorithm: 'HS256',
      expiresIn: access.accessExpire,
    }),
    jwt.sign({ id: refresh.payload.id }, secret, {
      algorithm: 'HS256',
      expiresIn: refresh.refreshExpire,
    }),
  ]);

  return { accessToken, refreshToken };
};

export const verify = async (
  token: string,
  secret: string,
): Promise<PayloadToken | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return reject(new BadRequestException('Mã không hợp lệ'));
      }
      if (decoded && typeof decoded === 'object') {
        return resolve(decoded as PayloadToken);
      }
      return reject(new BadRequestException('Cấu trúc mã không hợp lệ'));
    });
  });
};
