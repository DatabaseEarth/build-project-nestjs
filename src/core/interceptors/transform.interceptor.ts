import { ApiResponse } from '@/common/interfaces';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: any) => {
        // Nếu data đã null, trả thẳng để tránh nested object
        if (data === null) {
          return {
            status: 'success' as const,
            message: 'Thành công!',
            data: null,
          };
        }

        // Nếu data có định dạng ApiResponse (single, array, paginate)
        if (data.data !== undefined || data.meta !== undefined) {
          return {
            status: 'success' as const,
            message: data.message ?? 'Thành công!',
            data: data.data ?? null,
            meta: data.meta ?? undefined,
          };
        }

        // Trường hợp khác: trả trực tiếp
        return {
          status: 'success' as const,
          message: data.message ?? 'Thành công!',
          data,
        };
      }),
      catchError((err) => throwError(() => err)),
    );
  }
}
