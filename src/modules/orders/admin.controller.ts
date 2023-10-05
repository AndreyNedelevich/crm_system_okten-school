import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CsvParser } from 'nest-csv-parser';

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
  async getAllOrdersStatistic() {
    return await this.ordersService.getOrdersStatistic();
  }
}
