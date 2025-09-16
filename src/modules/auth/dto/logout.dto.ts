import { PickType } from '@nestjs/swagger';
import { TokenSessionDto } from './login.dto';

export class LogoutRequestDto extends PickType(TokenSessionDto, [
  'refreshToken',
] as const) {}
