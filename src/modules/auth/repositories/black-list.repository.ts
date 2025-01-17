import { RefreshTokenEntity } from '@databases/entities';
import { BlackListEntity } from '@databases/entities/blackList.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BlackListRepository {
  protected readonly _black_list_repo: Repository<BlackListEntity>;
  constructor(data_source: DataSource) {
    this._black_list_repo = data_source.getRepository(BlackListEntity);
  }

  async save(access_token: string, user_id: string) {
    const result = await this._black_list_repo.save({
      token: access_token,
      userId: user_id,
    });
    return result;
  }

  async getBlackListByToken(token: string) {
    return await this._black_list_repo
      .createQueryBuilder('black_list')
      .where('black_list.token = :token', { token: token })
      .getOne();
  }
}
