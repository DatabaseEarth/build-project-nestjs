import { ApiProperty } from '@nestjs/swagger';
import { DataResponse } from '@system/response';
import { Expose, plainToClass } from 'class-transformer';

export class SignInData {
  @ApiProperty({ name: 'id', type: 'string' })
  @Expose()
  id: string;

  @ApiProperty({ name: 'fullname', type: 'string' })
  @Expose()
  fullname: string;

  @ApiProperty({ name: 'email', type: 'string' })
  @Expose()
  email: string;

  @ApiProperty({ name: 'avatar', type: 'string' })
  @Expose()
  avatar: string;

  @ApiProperty({ name: 'address', type: 'string' })
  @Expose()
  address: string;

  @ApiProperty({ name: 'mobile', type: 'string' })
  @Expose()
  mobile: string;

  @ApiProperty({ name: 'birthday', type: 'string' })
  @Expose()
  birthday: string;
}

export class SignInResponse extends DataResponse<SignInData> {
  constructor(data: SignInData, message?: string) {
    super(
      plainToClass(SignInData, data, { excludeExtraneousValues: true }),
      message,
    );
  }
}
