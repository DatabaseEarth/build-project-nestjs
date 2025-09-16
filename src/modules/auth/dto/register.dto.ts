import { validateMessage } from '@/common/helpers';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    name: 'full_name',
    type: 'string',
    example: 'Nguyễn Thành Vinh',
  })
  @IsString({ message: validateMessage.string('Họ và tên') })
  @Length(2, 255, { message: validateMessage.length('Họ và tên', 2, 255) })
  @IsNotEmpty({ message: validateMessage.required('Họ và tên') })
  @Expose({ name: 'full_name' })
  fullName: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'info@vinhnt.vn',
  })
  @IsEmail({}, { message: validateMessage.string('Email') })
  @MaxLength(100, { message: validateMessage.max.string('Email', 100) })
  @IsNotEmpty({ message: validateMessage.required('Email') })
  @Expose({ name: 'email' })
  email: string;

  @ApiProperty({
    name: 'phone',
    type: 'string',
    example: '+84775922008',
  })
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: validateMessage.invalid('Số điện thoại'),
  })
  @IsNotEmpty({ message: validateMessage.required('Số điện thoại') })
  @Expose({ name: 'phone' })
  phone: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'info@vinhnt.vn',
  })
  @IsString({ message: validateMessage.string('Mật khẩu') })
  @IsNotEmpty({ message: validateMessage.required('Mật khẩu') })
  @Length(8, 50, { message: validateMessage.length('Mật khẩu', 8, 50) })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  })
  @Expose({ name: 'password' })
  password: string;
}

export class RegisterResponseDto {}
