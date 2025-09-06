import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export interface IValidationErrors {
  [field: string]: string[];
}

const buildValidationErrors = (
  errors: ValidationError[],
  parentProperty = '',
): IValidationErrors => {
  return errors.reduce((acc: IValidationErrors, err) => {
    const propertyPath = parentProperty
      ? `${parentProperty}.${err.property}`
      : err.property;

    if (err.constraints) {
      acc[propertyPath] = Object.values(err.constraints);
    }

    if (err.children && err.children.length > 0) {
      Object.assign(acc, buildValidationErrors(err.children, propertyPath));
    }

    return acc;
  }, {});
};

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const formattedErrors = buildValidationErrors(errors);

    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: formattedErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
