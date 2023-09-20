import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiPaginatedResponse, PaginatedDto } from '../../common/decorators';
import { Orders_queryResponseDto } from './models/dtos/request';
import { OrdersResponseDto } from './models/dtos/response';
import { OrdersService } from './services/orders.service';

@ApiTags('Orders')
@ApiExtraModels(OrdersResponseDto, PaginatedDto)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get orders with pagination' })
  @ApiPaginatedResponse('entities', OrdersResponseDto)
  @Get('orders')
  async getOrdersList(
    @Query() query: Orders_queryResponseDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    return await this.ordersService.getAllOrders(query);
  }
}
