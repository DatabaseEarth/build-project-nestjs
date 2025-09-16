
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators';
import { Logger } from 'nestjs-pino';
import { UserRepository } from '@/modules/user/repositories';
import { RefreshTokenRepository } from '../repositories';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private readonly configService: ConfigService,
        private readonly logger: Logger,

        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get<string>('AUTH_SECRET'),
                }
            );

            const [user, refreshToken] = await Promise.all([
                this.userRepository.getUserWithFilter({ id: payload.id }),
                this.refreshTokenRepository.getRefreshTokenWithFilter({ sessionId: payload.sessionId })
            ]);
            if (!refreshToken) throw new UnauthorizedException();

            request['user'] = user;
        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException('Xác thực không thành công!');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
