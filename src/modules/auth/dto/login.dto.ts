import { ApiProperty, PickType } from '@nestjs/swagger';
import { RegisterRequestDto } from './register.dto';
import { Expose, Transform } from 'class-transformer';
import { TokenSession } from '@/common/interfaces';

export class LoginRequestDto extends PickType(RegisterRequestDto, [
  'email',
  'password',
] as const) { }

export class TokenSessionDto implements TokenSession {
  @ApiProperty({ name: 'access_token', type: 'string' })
  @Expose({ name: 'access_token' })
  accessToken: string;

  @ApiProperty({ name: 'refresh_token', type: 'string' })
  @Expose({ name: 'refresh_token' })
  refreshToken: string;
}

export class LoginResponseDto extends TokenSessionDto {
  @Transform(({ obj }) => obj.accessToken)
  accessToken: string


  @Transform(({ obj }) => obj.refreshToken)
  refreshToken: string;
}
