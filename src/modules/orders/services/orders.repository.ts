import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Orders } from '../../../database/entities';
import { OrdersResponseDto } from '../models/dtos/response';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(private readonly dataSource: DataSource) {
    super(Orders, dataSource.manager);
  }

  public async getAllOrders(): Promise<OrdersResponseDto[]> {
    return await this.find();
  }
}
