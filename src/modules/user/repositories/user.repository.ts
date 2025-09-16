import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { hash } from '@/common/utils';
import { UserEntity } from '@/infrastructure/database/entities/user.entity';

@Injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserEntity);
  }

  async getUserWithFilter(filter: {
    id?: string;
    email?: string;
    fullName?: string;
  }): Promise<UserEntity | null> {
    if (!filter.id && !filter.email)
      throw new Error('Either id or email must be provided');

    const where: Record<string, any> = {};
    if (filter.id) where.id = filter.id;
    if (filter.email) where.email = filter.email;
    if (filter.fullName) where.fullName = filter.fullName;

    return await this.repository.findOne({ where });
  }

  async createUserWithParam(params: {
    email: string;
    fullName: string;
    phone: string;
    password: string;
  }): Promise<UserEntity> {
    const user = this.repository.create({
      email: params.email,
      fullName: params.fullName,
      phone: params.phone,
      password: await hash(params.password, 10),
    });

    return this.repository.save(user);
  }
}
