import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ApiSuccessResponse, MetaData } from '../interfaces/response.interface';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class DataMetaData implements MetaData {
  @ApiProperty({ description: 'Tổng số item' })
  totalItems: number;

  @ApiProperty({ description: 'Số item trả về trong trang hiện tại' })
  itemCount: number;

  @ApiProperty({ description: 'Số item trên mỗi trang' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Tổng số trang' })
  totalPages: number;

  @ApiProperty({ description: 'Trang hiện tại' })
  currentPage: number;

  constructor(meta?: Partial<MetaData>) {
    if (meta) {
      this.totalItems = meta.totalItems;
      this.itemCount = meta.itemCount;
      this.itemsPerPage = meta.itemsPerPage;
      this.totalPages = meta.totalPages;
      this.currentPage = meta.currentPage;
    }
  }
}

export class DataResponse<T> implements ApiSuccessResponse<T> {
  @ApiProperty({ description: 'Trạng thái trả về' })
  status: 'success' | 'oke';

  @ApiProperty({ description: 'Dữ liệu phản hồi' })
  data: T | T[] | null;

  @ApiProperty({
    description: 'Thông báo liên quan đến phản hồi',
    required: false,
  })
  message: string;

  constructor(data?: T | T[] | null, message?: string) {
    this.data = data ?? null;
    this.message = message || 'Thành công!';
  }
}

export function getSwaggerSchema(
  type: any,
  isArray = false,
): SchemaObject | ReferenceObject {
  let schema: SchemaObject | ReferenceObject;

  switch (true) {
    case !type:
      schema = { nullable: true, default: null };
      break;
    case type === String:
      schema = { type: 'string' };
      break;
    case type === Number:
      schema = { type: 'number' };
      break;
    case type === Boolean:
      schema = { type: 'boolean' };
      break;
    case !!(type as any).enum:
      schema = { enum: (type as any).enum };
      break;
    default:
      schema = { $ref: getSchemaPath(type) } as ReferenceObject;
  }

  if (isArray) schema = { type: 'array', items: schema };

  return schema;
}

type ApiDataResponseOptions =
  | { isArray: true; withMeta?: boolean }
  | { isArray?: false; withMeta?: false };
export const ApiDataResponse = <Data extends Type<unknown> | null = null>(
  data?: Data,
  options?: ApiDataResponseOptions,
  additionProp?: Record<string, SchemaObject | ReferenceObject>,
) => {
  const responseClass = DataResponse;
  const properties: Record<string, any> = {};
  properties.data = getSwaggerSchema(data, options?.isArray);

  if (options?.withMeta)
    properties.meta = { $ref: getSchemaPath(DataMetaData) };
  if (additionProp) Object.assign(properties, additionProp);

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(responseClass) }, { properties }],
      },
    }),
  );
};
