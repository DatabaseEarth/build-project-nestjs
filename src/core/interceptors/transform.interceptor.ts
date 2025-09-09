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
      map((data: any) => ({
        status: 'success' as const,
        message: data.message ?? 'Thành công!',
        data: data.data ?? data,
        meta: data.meta ?? undefined,
      })),
      catchError((err) => {
        // console.error('Error in TransformInterceptor:', err);
        return throwError(() => err);
      }),
    );
  }
}
