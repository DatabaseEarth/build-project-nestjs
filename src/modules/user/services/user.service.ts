import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../reposisories';
import { DataSource } from 'typeorm';
import { AuthService } from '@modules/auth/services';

@Injectable()
export class UserService {
  constructor(
    data_source: DataSource,

    private readonly userRepository: UserRepository,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async GetOneByEmail(email: string) {
    return this.userRepository.GetOneByEmail(email);
  }

  async GetOneByFullName(fullname: string) {
    return this.userRepository.GetOneByFullName(fullname);
  }

  async save(fullname: string, email: string, password: string) {
    return this.userRepository.save(fullname, email, password);
  }
}
