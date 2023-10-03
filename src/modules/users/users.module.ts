import { Module } from '@nestjs/common';

import { ProfileModule } from '../profile/profile.module';
import { RolesModule } from '../roles/roles.module';
import { UserRepository } from './services/user.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [RolesModule, ProfileModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
