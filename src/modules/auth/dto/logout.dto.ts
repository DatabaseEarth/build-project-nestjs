import { PartialType, PickType } from '@nestjs/swagger';
import { TokenSessionDto } from './login.dto';

export class LogoutRequestDto extends PartialType(PickType(TokenSessionDto, ['refreshToken'] as const)) { }
