import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../../common/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Orders_statisticResponseDto } from './models/dtos/response';
import { OrdersService } from './services/orders.service';

@ApiTags('Admin')
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('admin')
export class OrdersAdminController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get statistic by all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All orders statistic',
    type: Orders_statisticResponseDto,
  })
  @Get('orders/statistic')
  async getAllOrdersStatistic(): Promise<Orders_statisticResponseDto> {
    return await this.ordersService.getOrdersStatistic();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get statistic to orders by one User' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders statistic by user',
    type: Orders_statisticResponseDto,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id',
  })
  @Get('orders/statistic/users/:userId')
  async getAOrdersStatisticByUser(
    @Param('userId') userId: string,
  ): Promise<Orders_statisticResponseDto> {
    return await this.ordersService.getOrdersStatistic(+userId);
  }
}
