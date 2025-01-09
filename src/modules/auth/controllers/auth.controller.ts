import { AuthConfig } from '@config/auth.config';
import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequest } from '../dtos';
import { AuthService } from '../services';
import { DataResponse } from '@system/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth_config: AuthConfig,
    private readonly auth_service: AuthService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() request: SignUpRequest) {
    const result = await this.auth_service.signUp(request);
    return new DataResponse({
      id: result.id,
    });
  }
}
