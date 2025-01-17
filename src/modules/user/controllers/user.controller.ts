import { CurrentUser, RequiredAuth } from '@modules/auth/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User - Người dùng')
@Controller('user')
export class UserController {
  constructor() {}

  @Get()
  @RequiredAuth()
  async testuser(@CurrentUser() user) {
    return user;
  }
}
