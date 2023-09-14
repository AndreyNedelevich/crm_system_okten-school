import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../../database/entities';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './services/orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [],
})
export class OrdersModule {}
