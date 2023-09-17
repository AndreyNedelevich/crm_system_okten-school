import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { OrdersResponseDto } from './models/dtos/response';
import { OrdersService } from './services/orders.service';
import { SkipAuth } from "../../common/decorators";

@SkipAuth()
@ApiTags('Orders')
@ApiExtraModels(OrdersResponseDto)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('orders')

  async getOrdersList(): Promise<OrdersResponseDto[]> {
    return await this.ordersService.getAllOrders();
  }
}
