import { Injectable } from '@nestjs/common';
import { OrdersResponseDto } from '../models/dtos/response';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async getAllOrders(): Promise<OrdersResponseDto[]> {
    return await this.ordersRepository.getAllOrders();
  }
}
