import { Module } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { GroupsModule } from '../groups/groups.module';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './services/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [CommentsModule, UsersModule, CommentsModule, GroupsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [],
})
export class OrdersModule {}
