import { Injectable } from '@nestjs/common';
import { BlackListRepository } from '../repositories';

@Injectable()
export class BlackListProvider {
  constructor(protected readonly _black_list_repository: BlackListRepository) {}
  async getBlackListByToken(token: string) {
    return await this._black_list_repository.getBlackListByToken(token);
  }

  async save(access_token: string, user_id: string) {
    return await this._black_list_repository.save(access_token, user_id);
  }
}
