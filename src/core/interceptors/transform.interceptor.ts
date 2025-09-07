import { ApiResponse } from '@/common/interfaces';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(map(
      (data: any) => ({
        data: data.data ?? data,
        message: data.message ?? 'Thành công!',
        meta: data.meta ?? undefined
      })
    ));
  }
}
