import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export type IResponseErrors = Record<string, string[]>;

export const parseErrors = (
  raw_errors: ValidationError[] | null,
  errors: IResponseErrors = {},
  path = '',
): IResponseErrors => {
  if (!raw_errors) return {};

  return raw_errors.reduce((acc, error) => {
    const _path = path ? `${path}.${error.property}` : error.property;

    const { constraints, children } = error;

    if (constraints) {
      acc[_path] = Object.keys(constraints).map((key) => constraints[key]);

      // or acc[_path] = Object.values(constraints).map((value) => value);
    }

    if (children && children.length) {
      parseErrors(children, acc, _path);
    }

    return acc;
  }, errors);
};

export class ValidationException extends HttpException {
  constructor(
    errors: IResponseErrors | null = null,
    raw_errors: ValidationError[] | null = null,
  ) {
    const _errors = errors ?? parseErrors(raw_errors);

    super(
      {
        message: Object.values(_errors)?.[0]?.[0] ?? 'Invalid data',
        error: _errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
