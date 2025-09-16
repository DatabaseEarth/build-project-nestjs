import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ApiResponse, MetaData } from '@/common/interfaces';

export const formatResponse = {
  single<T>(
    dto: (new (...args: any[]) => T) | null,
    data: any = null,
    message = 'Thành công',
  ): ApiResponse<T | null> {
    const transformedData =
      dto && data
        ? plainToInstance(dto, data, {
            excludeExtraneousValues: true,
          })
        : null;
    return {
      status: 'success',
      message,
      data: instanceToPlain(transformedData) as T,
    };
  },

  array<T>(
    dto: new (...args: any[]) => T,
    data: any[],
    message = 'Thành công',
  ): ApiResponse<T[]> {
    const transformedData = plainToInstance(dto, data, {
      excludeExtraneousValues: true,
    });
    return {
      status: 'success',
      message,
      data: instanceToPlain(transformedData) as T[],
    };
  },

  paginate<T>(
    dto: new (...args: any[]) => T,
    data: any[],
    message = 'Thành công',
    page: number,
    size: number,
  ): ApiResponse<T[]> {
    const transformedData = plainToInstance(dto, data, {
      excludeExtraneousValues: true,
    });
    const totalItems = data.length;

    const meta: MetaData = {
      totalItems,
      itemCount: Math.min(size, totalItems),
      itemsPerPage: size,
      totalPages: Math.ceil(totalItems / size),
      currentPage: page,
    };

    return {
      status: 'success',
      data: instanceToPlain(transformedData) as T[],
      message,
      meta,
    };
  },
};
