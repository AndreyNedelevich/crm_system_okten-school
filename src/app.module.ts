import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfiguration } from './config/connectDB/type-orm-configuration';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule } from './config/app/config.module';
import { MysqlConfigModule } from './config/connectDB/config.module';

import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UsersModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
