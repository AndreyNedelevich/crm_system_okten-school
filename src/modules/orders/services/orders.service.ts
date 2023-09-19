import { Injectable } from '@nestjs/common';
import { OrdersResponseDto } from '../models/dtos/response';
import { OrdersRepository } from './orders.repository';
import { Orders_queryResponseDto } from "../models/dtos/request";
import { PaginatedDto } from "../../../common/decorators";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async getAllOrders(query:Orders_queryResponseDto):Promise<PaginatedDto<OrdersResponseDto>>  {
    return await this.ordersRepository.getAllOrders(query);
  }
}
