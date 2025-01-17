import { AuthConfig } from '@config/auth.config';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignInRequest, SignUpRequest } from '../dtos';
import { AuthService } from '../services';
import { ApiDataResponse } from '@system/response';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SignUpData, SignUpResponse } from '../dtos/responses';
import { Response } from 'express';
import { CurrentUser, RequiredAuth, SessionUser } from '../decorators';
import { ISessionToken, IUserCurrent } from '../interfaces';

@ApiTags('Authentication - Người dùng')
@ApiExtraModels(SignUpData)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth_config: AuthConfig,
    private readonly auth_service: AuthService,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản người dùng' })
  @ApiBody({ description: 'Nội dung yêu cầu đăng ký', type: SignUpRequest })
  @ApiDataResponse({ $ref: getSchemaPath(SignUpData) })
  async register(@Body() request: SignUpRequest) {
    const result = await this.auth_service.signUp(request);
    return new SignUpResponse(
      {
        id: result.id,
      },
      'Đăng ký tài khoản thành công',
    );
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Đăng nhập tài khoản người dùng' })
  @ApiBody({ description: 'Nội dung yêu cầu đăng nhập', type: SignInRequest })
  @ApiResponse({
    status: 204,
    description: 'Đăng nhập thành công, trả về cookies',
  })
  async login(
    @Body() signInRequest: SignInRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } =
      await this.auth_service.signIn(signInRequest);

    response.cookie(this.auth_config.getAccessCookieName(), access_token, {
      httpOnly: true,
      maxAge: this.auth_config.getAccessExpires() * 1000,
    });

    response.cookie(this.auth_config.getRefreshCookieName(), refresh_token, {
      httpOnly: true,
      maxAge: this.auth_config.getRefreshExpires() * 1000,
    });
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Đăng xuất tài khoản người dùng' })
  @RequiredAuth()
  async logout(
    @CurrentUser() user: IUserCurrent,
    @SessionUser() sessionToken: ISessionToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.auth_service.signOut(user, sessionToken);

    response.clearCookie(this.auth_config.getAccessCookieName());
    response.clearCookie(this.auth_config.getRefreshCookieName());
  }

  @Get('refresh-token')
  @RequiredAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async refreshToken(
    @CurrentUser() user: IUserCurrent,
    @SessionUser() sessionToken: ISessionToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    const access_token = await this.auth_service.refreshToken(
      user,
      sessionToken,
    );

    response.cookie(this.auth_config.getAccessCookieName(), access_token, {
      httpOnly: true,
      maxAge: this.auth_config.getAccessExpires() * 1000,
    });
  }
}
