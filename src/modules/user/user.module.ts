import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserRepository } from './repositories';
import { UserService } from './services';

@Module({
  controllers: [UserController],
  imports: [],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
