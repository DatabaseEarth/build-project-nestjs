import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';

import { isObject } from 'class-validator';
import { Request } from 'express';

export class AllExceptionFilter<T = any> implements ExceptionFilter<T> {
  protected static readonly _logger = new Logger('ExceptionsHandler');

  constructor(protected readonly _http: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost) {
    const app_ref = this._http && this._http.httpAdapter;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      return this.handleUnkownError(exception, host, app_ref, req);
    }

    const res = exception.getResponse();

    let body: any;

    if (isObject(res)) {
      if ('statusCode' in res) {
        delete res['statusCode'];
      }

      body = res;
    } else {
      body = {
        message: res,
      };
    }

    // const body: Record<string, any> = {
    //   message: res['message'] ?? res,
    // };

    const response = host.getArgByIndex(1);

    if (!app_ref.isHeadersSent(response)) {
      app_ref.reply(response, body, exception.getStatus());
    } else {
      app_ref.end(response);
    }
  }

  public handleUnkownError(
    exception: T,
    host: ArgumentsHost,
    app_ref: AbstractHttpAdapter | HttpServer,
    req: Request,
  ) {
    const body = this.isHttpError(exception)
      ? {
          status_code: exception.statusCode,
          message: exception.message,
        }
      : {
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        };

    const response = host.getArgByIndex(1);

    if (!app_ref.isHeadersSent(response)) {
      app_ref.reply(response, { message: body.message }, body.status_code);
    } else {
      app_ref.end(response);
    }

    if (this.isExceptionObject(exception)) {
      return AllExceptionFilter._logger.error(
        `[${req.method.toUpperCase()}] [${req.url}] ${exception.message}`,
        exception.stack,
      );
    }

    return AllExceptionFilter._logger.error(
      `[${req.method.toUpperCase()}] [${req.url}]`,
      exception,
    );
  }

  public isExceptionObject(err: any): err is Error {
    return isObject(err) && !!(err as Error).message;
  }

  /**
   * Checks if the thrown error comes from the "http-errors" library.
   * @param err error object
   */
  public isHttpError(err: any): err is { statusCode: number; message: string } {
    return err?.statusCode && err?.message;
  }
}
