import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const configToken = 'mysql';

export default registerAs(configToken, () => ({
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  user: configService.get<string>('MYSQL_USER'),
  password: configService.get<string>('MYSQL_PASSWORD'),
  database: configService.get<string>('MYSQL_DATABASE'),
}));
