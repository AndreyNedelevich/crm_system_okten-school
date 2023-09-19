import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Orders } from '../../../database/entities';
import { OrdersResponseDto } from '../models/dtos/response';
import { PaginatedDto } from "../../../common/decorators";
import { ColumnsEnum } from "../models/enums";

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(private readonly dataSource: DataSource) {
    super(Orders, dataSource.manager);
  }

  public async getAllOrders(query):Promise<PaginatedDto<OrdersResponseDto>> {

    query.order = query.order || 'ASC';

    const page = +query.page || 1;
    const limit = +query.limit || 25;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('orders');



    switch (query.sort) {
      case ColumnsEnum.name:
        queryBuilder.orderBy('orders.name', query.order);
        break;
      case ColumnsEnum.surname:
        queryBuilder.orderBy('orders.surname', query.order);
        break;
      case ColumnsEnum.email:
        queryBuilder.orderBy('orders.email', query.order);
        break;
      case ColumnsEnum.phone:
        queryBuilder.orderBy('orders.phone', query.order);
        break;
      case ColumnsEnum.age:
        queryBuilder.orderBy('orders.age', query.order);
        break;
      case ColumnsEnum.course:
        queryBuilder.orderBy('orders.course', query.order);
        break;
      case ColumnsEnum.course_format:
        queryBuilder.orderBy('orders.course_format', query.order);
        break;
      case ColumnsEnum.course_type:
        queryBuilder.orderBy('orders.course_type', query.order);
        break;
      case ColumnsEnum.sum:
        queryBuilder.orderBy('orders.sum', query.order);
        break;
      case ColumnsEnum.alreadyPaid:
        queryBuilder.orderBy('orders.alreadyPaid', query.order);
        break;
      case ColumnsEnum.status:
        queryBuilder.orderBy('orders.status', query.order);
        break;
      case ColumnsEnum.manager:
        queryBuilder.orderBy('orders.manager', query.order);
        break;
      default:
        queryBuilder.orderBy('orders.id', query.order);
    }



    queryBuilder.limit(limit);
    queryBuilder.offset(offset);

    const [entities, count] = await queryBuilder.getManyAndCount();

    return {
      page,
      pages: Math.ceil(count / limit),
      countItem: count,
      entities
    }
  }
}
