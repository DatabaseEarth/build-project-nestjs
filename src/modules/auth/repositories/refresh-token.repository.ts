import { RefreshTokenStatus } from '@common';
import { RefreshTokenEntity } from '@databases/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository {
  protected readonly _refresh_token_repo: Repository<RefreshTokenEntity>;
  constructor(data_source: DataSource) {
    this._refresh_token_repo = data_source.getRepository(RefreshTokenEntity);
  }

  async save(token: string, user_id: string, iatDate: string, expDate: string) {
    const result = await this._refresh_token_repo.save({
      token: token,
      userId: user_id,
      issuedAt: iatDate,
      expiresAt: expDate,
      status: RefreshTokenStatus.ACTIVE,
    });
    return result;
  }

  async updateStatusRevoked(refresh_token: string) {
    const tokenRecord = await this._refresh_token_repo.findOne({
      where: { token: refresh_token },
    });

    if (!tokenRecord) {
      throw new Error('Không tìm thấy token để cập nhật.');
    }

    tokenRecord.status = RefreshTokenStatus.REVOKED;
    tokenRecord.updated_at = new Date();

    return await this._refresh_token_repo.save(tokenRecord);
  }
}
