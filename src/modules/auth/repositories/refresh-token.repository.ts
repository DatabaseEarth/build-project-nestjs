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
}
