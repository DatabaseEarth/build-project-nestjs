import { validateMessage } from '@system/validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequest {
  @IsString({ message: validateMessage.string('Fullname') })
  @IsNotEmpty({ message: validateMessage.required('Fullname') })
  fullname!: string;

  @IsString({ message: validateMessage.string('Password') })
  @IsNotEmpty({ message: validateMessage.required('Password') })
  password!: string;

  @IsString({ message: validateMessage.string('Email') })
  @IsNotEmpty({ message: validateMessage.required('Email') })
  email!: string;
}
