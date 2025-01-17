import { UserEntity } from '@databases/entities';
import { Injectable } from '@nestjs/common';
import { _hash } from '@utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  protected readonly _user_repo: Repository<UserEntity>;
  constructor(data_source: DataSource) {
    this._user_repo = data_source.getRepository(UserEntity);
  }

  async GetOneByEmail(email: string) {
    const result = await this._user_repo
      .createQueryBuilder('_user_entity')
      .where('_user_entity.email = :email', { email: email })
      .getOne();
    return result;
  }

  async GetOneByFullName(fullname: string) {
    const result = await this._user_repo
      .createQueryBuilder('_user_entity')
      .where('_user_entity.fullname = :fullname', { fullname: fullname })
      .getOne();
    return result;
  }

  async save(fullname: string, email: string, password: string) {
    const result = await this._user_repo.save(
      this._user_repo.create({
        fullname: fullname,
        email: email,
        password: await _hash(password),
      }),
    );
    return result;
  }
}
