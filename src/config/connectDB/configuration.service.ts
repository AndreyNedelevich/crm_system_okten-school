import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class MysqlConfigService {
  constructor(
    @Inject(configuration.KEY)
    private AppConfiguration: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.AppConfiguration.host;
  }

  get port(): number {
    return Number(this.AppConfiguration.port);
  }

  get user(): string {
    return this.AppConfiguration.user;
  }

  get password(): string {
    return this.AppConfiguration.password;
  }

  get database(): string {
    return this.AppConfiguration.database;
  }
}
