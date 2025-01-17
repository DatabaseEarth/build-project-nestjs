import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserRepository } from './reposisories';
import { UserController } from './controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
