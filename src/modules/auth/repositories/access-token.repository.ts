import { AccessTokenEntity } from '@databases/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AccessTokenRepository {
  protected readonly _access_token_repository: Repository<AccessTokenEntity>;
  constructor(data_source: DataSource) {
    this._access_token_repository =
      data_source.getRepository(AccessTokenEntity);
  }

  async save(token: string, user_id: string, iatDate: string, expDate: string) {
    const result = await this._access_token_repository.save({
      token: token,
      userId: user_id,
      issuedAt: iatDate,
      expiresAt: expDate,
    });
    return result;
  }

  async getSessionByToken(token: string) {
    return await this._access_token_repository.findOne({ where: { token } });
  }
}
