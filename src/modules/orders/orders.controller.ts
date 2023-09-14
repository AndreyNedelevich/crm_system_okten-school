import { Controller, Get } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { OrdersResponseDto } from './models/dtos/response';
import { OrdersService } from './services/orders.service';

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
