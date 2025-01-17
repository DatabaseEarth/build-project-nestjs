import { ApiProperty } from '@nestjs/swagger';
import { DataResponse } from '@system/response';
import { Expose, plainToClass } from 'class-transformer';

export class SignUpData {
  @ApiProperty({ name: 'id', type: 'string' })
  @Expose()
  id: string;
}

export class SignUpResponse extends DataResponse<SignUpData> {
  constructor(data: SignUpData, message?: string) {
    super(
      plainToClass(SignUpData, data, { excludeExtraneousValues: true }),
      message,
    );
  }
}
