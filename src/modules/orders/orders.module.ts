import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comments.module';
import { GroupsModule } from '../groups/groups.module';
import { UsersModule } from '../users/users.module';
import { OrdersAdminController } from './admin.controller';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './services/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    CommentsModule,
    GroupsModule,
    AuthModule,
  ],
  controllers: [OrdersController, OrdersAdminController],
  providers: [OrdersService, OrdersRepository],
  exports: [],
})
export class OrdersModule {}
