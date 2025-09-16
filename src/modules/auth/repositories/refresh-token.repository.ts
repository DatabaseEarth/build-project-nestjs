import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '@/infrastructure/database/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  private repository: Repository<RefreshTokenEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RefreshTokenEntity);
  }

  async createRefreshTokenWithParam(params: {
    userId: string;
    token: string;
    sessionId: string;
    deviceInfo?: string;
    ipAddress?: string;
  }): Promise<RefreshTokenEntity | null> {
    const refreshToken = this.repository.create({
      userId: params.userId,
      token: params.token,
      sessionId: params.sessionId,
      deviceInfo: params.deviceInfo,
      ipAddress: params.ipAddress,
    });

    return await this.repository.save(refreshToken);
  }

  async getRefreshTokenWithFilter(filter: { id?: string, token?: string, sessionId?: string }) {
    if (!filter.id && !filter.sessionId)
      throw new Error('Phải có id hoặc session');

    const where: Record<string, any> = {};
    if (filter.id) where.id = filter.id;
    if (filter.token) where.token = filter.token;
    if (filter.sessionId) where.sessionId = filter.sessionId;

    return await this.repository.findOne({ where });
  }

  async deleteRefreshTokenWithParam(
    find: { refreshToken?: RefreshTokenEntity, id?: string, sessionId?: string },
  ) {
    let refreshToken: RefreshTokenEntity | null = null;
    const where: Record<string, any> = {}

    if (find.refreshToken) {
      refreshToken = find.refreshToken;
    } else if (find.id) {
      where.id = find.id,
        refreshToken = await this.repository.findOne({ where });
    } else if (find.sessionId) {
      where.sessionId = find.sessionId,
        refreshToken = await this.repository.findOne({ where });
    }

    if (!refreshToken)
      throw new Error('Refresh token không tồn tại');

    return await this.repository.delete({ id: refreshToken.id });
  }
}
