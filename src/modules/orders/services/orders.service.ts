import { Injectable } from '@nestjs/common';

import { PaginatedDto } from '../../../common/decorators';
import { Orders_queryResponseDto } from '../models/dtos/request';
import {
  CommentsOrderResponseDto,
  OrdersResponseDto,
} from '../models/dtos/response';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getAllOrders(
    query: Orders_queryResponseDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    return await this.ordersRepository.getAllOrders(query);
  }

  async createNewCommentForOrder(
    orderId,
    dto,
    userId,
  ): Promise<CommentsOrderResponseDto> {
    return await this.ordersRepository.createNewCommentForOrder(
      orderId,
      dto,
      userId,
    );
  }
}
