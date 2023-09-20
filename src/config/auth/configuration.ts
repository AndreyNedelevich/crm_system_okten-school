import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'auth';
export default registerAs(configToken, () => ({
  actionTokenSecret: configService.get<string>('ACTION_TOKEN_SECRET'),
  accessTokenSecret: configService.get<string>('AUTH_ACCESS_TOKEN_SECRET'),
  refreshTokenSecret: configService.get<string>('AUTH_REFRESH_TOKEN_SECRET'),
  accessTokenExpiration: configService.get<string>(
    'AUTH_ACCESS_TOKEN_EXPIRATION',
  ),
  refreshTokenExpiration: configService.get<string>(
    'AUTH_REFRESH_TOKEN_EXPIRATION',
  ),
  actionTokenExpiration: configService.get<string>('ACTION_TOKEN_EXPIRATION'),
}));
