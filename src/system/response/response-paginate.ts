import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { LengthAwarePaginator } from '../database';
import { DataResponse } from './response-data';

export class PaginateMeta {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: 'number', default: 10 })
  size: number;

  @ApiProperty({ type: 'number', default: 1 })
  page: number;

  @ApiProperty({ type: 'number', default: 1 })
  last_page: number;

  constructor(total: number, size: number, page: number, last_page: number) {
    this.total = total;
    this.size = size;
    this.page = page;
    this.last_page = last_page;
  }
}

export class DataPaginatedResponse<T> extends DataResponse<T[]> {
  @ApiProperty({ type: () => PaginateMeta })
  meta: PaginateMeta;

  constructor(paginator: LengthAwarePaginator<T>, message?: string) {
    super(paginator.items, message);

    this.meta = new PaginateMeta(
      paginator.total,
      paginator.size,
      paginator.page,
      paginator.last_page,
    );
  }
}

export const ApiDataPaginatedResponse = <Data extends Type<unknown>>(
  data: Data,
  addition_prop?: Record<string, SchemaObject | ReferenceObject>,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataPaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
              ...addition_prop,
            },
          },
        ],
      },
    }),
  );
};
