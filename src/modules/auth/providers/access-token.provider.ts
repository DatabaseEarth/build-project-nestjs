import { Injectable } from '@nestjs/common';
import { AccessTokenRepository } from '../repositories';
import { convertTimestampToDate, verify } from '../utils';

@Injectable()
export class AccessTokenProvider {
  constructor(
    protected readonly _access_token_repository: AccessTokenRepository,
  ) {}

  async save(token: string, user_id: string, secret: string) {
    const access_token_verify = await verify(token, secret);

    const iatDate = convertTimestampToDate(access_token_verify.iat);
    const expDate = convertTimestampToDate(access_token_verify.exp);

    return await this._access_token_repository.save(
      token,
      user_id,
      iatDate,
      expDate,
    );
  }

  async getSessionByToken(token: string) {
    return await this._access_token_repository.getSessionByToken(token);
  }
}
