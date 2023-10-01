import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { AuthConfigModule } from './config/auth/config.module';
import { MysqlConfigModule } from './config/connectDB/config.module';
import { TypeOrmConfiguration } from './config/connectDB/type-orm-configuration';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AppConfigModule,
    MysqlConfigModule,
    AuthConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UsersModule,
    CommentsModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
