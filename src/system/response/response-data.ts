import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class DataResponse<T> {
  @ApiProperty({ description: 'Dữ liệu phản hồi' })
  data: T;

  @ApiProperty({
    description: 'Thông báo liên quan đến phản hồi',
    required: false,
  })
  message?: string;

  constructor(data: T, message?: string) {
    this.data = data;
    this.message = message;
  }
}

export const ApiDataResponse = (schema: SchemaObject | ReferenceObject) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResponse) },
          {
            properties: {
              data: schema,
              message: {
                type: 'string',
                description: 'Thông báo liên quan đến phản hồi',
                example: 'Tin nhắn thông báo',
              },
            },
          },
        ],
      },
    }),
  );
};
