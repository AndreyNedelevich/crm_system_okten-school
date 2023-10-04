import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  CurrentUser,
  PaginatedDto,
} from '../../common/decorators';
import { IUserData } from '../../common/models/interfaces';
import { CommentsRequestDto } from '../comments/models/dtos/request';
import {
  Orders_editRequestDto,
  Orders_queryRequestDto,
} from './models/dtos/request';
import {
  CommentsOrderResponseDto,
  OrdersResponseDto,
} from './models/dtos/response';
import { OrdersService } from './services/orders.service';

@ApiTags('Orders')
@ApiExtraModels(OrdersResponseDto, PaginatedDto)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get orders with pagination' })
  @ApiPaginatedResponse('entities', OrdersResponseDto)
  @Get()
  async getOrdersList(
    @Query() query: Orders_queryRequestDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    return await this.ordersService.getAllOrders(query);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit order' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Data update was successfuly',
        },
      },
    },
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'Id order for edit data',
  })
  @Patch('/:orderId')
  async editOrder(
    @CurrentUser() user: IUserData,
    @Body() body: Orders_editRequestDto,
    @Param('orderId') orderId: string,
  ): Promise<{ message: string }> {
    return await this.ordersService.editOrder(orderId, body, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'User comments for the order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentsOrderResponseDto,
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'id order for  comment',
  })
  @Post('/:orderId/comments')
  async CommentsOrders(
    @CurrentUser() user: IUserData,
    @Body() body: CommentsRequestDto,
    @Param('orderId') orderId: string,
  ): Promise<CommentsOrderResponseDto> {
    return await this.ordersService.createNewCommentForOrder(
      orderId,
      body,
      user,
    );
  }
}
