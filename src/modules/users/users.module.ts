import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { RolesModule } from '../roles/roles.module';
import { AdminController } from './amin.controller';
import { UserRepository } from './services/user.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController, AdminController],
  imports: [RolesModule, ProfileModule, forwardRef(() => AuthModule)],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
