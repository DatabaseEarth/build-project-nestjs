import { ApiProperty } from '@nestjs/swagger';
import { validateMessage } from '@system/validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequest {
  @ApiProperty({
    name: 'fullname',
    type: 'string',
    example: 'Tên người dùng',
  })
  @IsString({ message: validateMessage.string('Fullname') })
  @IsNotEmpty({ message: validateMessage.required('Fullname') })
  fullname!: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'Mật khẩu người dùng',
  })
  @IsString({ message: validateMessage.string('Password') })
  @IsNotEmpty({ message: validateMessage.required('Password') })
  password!: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'email người dùng',
  })
  @IsString({ message: validateMessage.string('Email') })
  @IsNotEmpty({ message: validateMessage.required('Email') })
  email!: string;
}
