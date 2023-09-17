import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class AuthConfigService {
  constructor(
    @Inject(configuration.KEY)
    private authConfiguration: ConfigType<typeof configuration>,
  ) {}

  get actionTokenSecret(): string {
    return this.authConfiguration.actionTokenSecret;
  }

  get actionTokenExpiration(): string {
    return this.authConfiguration.actionTokenExpiration;
  }

  get accessTokenSecret(): string {
    return this.authConfiguration.accessTokenSecret;
  }

  get accessTokenExpiration(): string {
    return this.authConfiguration.accessTokenExpiration;
  }

  get refreshTokenSecret(): string {
    return this.authConfiguration.refreshTokenSecret;
  }

  get refreshTokenExpiration(): string {
    return this.authConfiguration.refreshTokenExpiration;
  }
}
