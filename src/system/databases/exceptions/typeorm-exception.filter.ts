import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';

import { EntityNotFoundError, TypeORMError } from 'typeorm';

import { isProduction } from '@utils/index';

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  protected static readonly logger = new Logger(TypeORMExceptionFilter.name);

  constructor(protected readonly http_adapter_host: HttpAdapterHost) {}

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const application_ref = this.http_adapter_host.httpAdapter;

    const response = host.getArgByIndex(1);

    let status_code = HttpStatus.INTERNAL_SERVER_ERROR;

    const body = {
      message: isProduction()
        ? MESSAGES.UNKNOWN_EXCEPTION_MESSAGE
        : exception.message,
    };

    if (exception instanceof EntityNotFoundError) {
      status_code = HttpStatus.NOT_FOUND;
      body.message = isProduction() ? 'Not found' : exception.message;
    } else {
      TypeORMExceptionFilter.logger.error(exception.message, exception.stack);
    }

    if (!application_ref.isHeadersSent(response)) {
      application_ref.reply(response, body, status_code);
    } else {
      application_ref.end(response);
    }
  }
}
