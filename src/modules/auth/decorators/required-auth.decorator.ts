import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../guards';

export const RequiredAuth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
