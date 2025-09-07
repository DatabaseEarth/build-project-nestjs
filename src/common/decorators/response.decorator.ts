import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ApiResponse, MetaData } from '../interfaces/response.interface';
import { applyDecorators, Type } from '@nestjs/common';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

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

export class DataResponse<T> implements ApiResponse<T> {
    @ApiProperty({ description: 'Dữ liệu phản hồi' })
    data: T | T[];

    @ApiProperty({
        description: 'Thông báo liên quan đến phản hồi',
        required: false,
    })
    message: string;

    constructor(data: T | T[], message?: string) {
        this.data = data;
        this.message = message || 'Thành công!';
    }
}

type ApiDataResponseOptions =
    | { isArray: true; withMeta?: boolean }
    | { isArray?: false; withMeta?: false };
export const ApiDataResponse = <Data extends Type<unknown>>(
    data: Data,
    options?: ApiDataResponseOptions,
    additionProp?: Record<string, SchemaObject | ReferenceObject>,
) => {
    const responseClass = DataResponse;

    const properties: Record<string, any> = {
        data: options?.isArray
            ? { type: 'array', items: { $ref: getSchemaPath(data) } }
            : { $ref: getSchemaPath(data) },
    };

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
