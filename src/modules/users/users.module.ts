import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileEntity, RoleEntity, UserEntity } from '../../database/entities';
import { RolesModule } from '../roles/roles.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { UserRepository } from "./services/user.repository";

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, ProfileEntity]),
    RolesModule,
  ],
  providers: [UsersService,UserRepository],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
