import { UnauthorizedException } from '@nestjs/common';

import { ErrorType } from '../../models';

export class ActionTokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.AccessTokenExpired,
      message: 'Action token has expired',
    });
  }
}
