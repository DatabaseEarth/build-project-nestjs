import { Injectable } from '@nestjs/common';
import { convertTimestampToDate, verify } from '../utils';
import { RefreshTokenRepository } from '../repositories';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    protected readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async save(token: string, user_id: string, secret: string) {
    const refresh_token_verify = await verify(token, secret);

    const iatDate = convertTimestampToDate(refresh_token_verify.iat);
    const expDate = convertTimestampToDate(refresh_token_verify.exp);

    return await this.refreshTokenRepository.save(
      token,
      user_id,
      iatDate,
      expDate,
    );
  }

  async updateStatusRevoked(refresh_token: string) {
    return await this.refreshTokenRepository.updateStatusRevoked(refresh_token);
  }
}
