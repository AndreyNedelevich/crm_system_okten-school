import { Injectable } from '@nestjs/common';

import { PaginatedDto } from '../../../common/decorators';
import { IUserData } from '../../../common/models/interfaces';
import {
  Orders_editRequestDto,
  Orders_queryRequestDto,
} from '../models/dtos/request';
import {
  CommentsOrderResponseDto,
  Orders_statisticResponseDto,
  OrdersResponseDto,
} from '../models/dtos/response';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getAllOrders(
    query: Orders_queryRequestDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    return await this.ordersRepository.getAllOrders(query);
  }

  async getOrdersExelTable(
    query: Orders_queryRequestDto,
  ): Promise<OrdersResponseDto[]> {
    return await this.ordersRepository.getOrdersExelTable(query);
  }

  async editOrder(
    orderId: string,
    dto: Orders_editRequestDto,
    currentUser: IUserData,
  ) {
    return await this.ordersRepository.editOrder(orderId, dto, currentUser);
  }

  async createNewCommentForOrder(
    orderId,
    dto,
    user,
  ): Promise<CommentsOrderResponseDto> {
    return await this.ordersRepository.createNewCommentForOrder(
      orderId,
      dto,
      user,
    );
  }

  async getOrdersStatistic(
    userId?: number,
  ): Promise<Orders_statisticResponseDto> {
    return await this.ordersRepository.getOrdersStatistic(userId);
  }
}
