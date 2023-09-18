import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { AuthConfigModule } from './config/auth/config.module';
import { MysqlConfigModule } from './config/connectDB/config.module';
import { TypeOrmConfiguration } from './config/connectDB/type-orm-configuration';
import { AuthModule } from "./modules/auth/auth.module";
import { OrdersModule } from './modules/orders/orders.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlConfigModule,
    AuthConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UsersModule,
    OrdersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
