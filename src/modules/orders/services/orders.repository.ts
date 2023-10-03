import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { DateUtils } from 'typeorm/util/DateUtils';

import { PaginatedDto } from '../../../common/decorators';
import { OrderEnum } from '../../../common/models';
import { Orders } from '../../../database/entities';
import { CommentsRepository } from '../../comments/services/comments.repository';
import { UserRepository } from '../../users/services/user.repository';
import { Orders_queryResponseDto } from '../models/dtos/request';
import {
  CommentsOrderResponseDto,
  OrdersResponseDto,
} from '../models/dtos/response';
import { ColumnsEnum } from '../models/enums';
import { Comment_ordersMapper } from './comment_orders.mapper';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {
    super(Orders, dataSource.manager);
  }

  public async getAllOrders(
    query: Orders_queryResponseDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    query.order = query.order || OrderEnum.ASC;
    const page = +query.page || 1;
    const limit = +query.limit || 25;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.groups', 'group')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('orders.comments', 'comments');

    this.applyFilters(queryBuilder, query);
    this.applyDateFilters(queryBuilder, query.start_date, query.end_date);
    this.applySort(queryBuilder, query.sort, query.order);

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    const [entities, count] = await queryBuilder.getManyAndCount();

    return {
      page,
      pages: Math.ceil(count / limit),
      countItem: count,
      entities,
    };
  }

  async createNewCommentForOrder(
    orderId,
    dto,
    userId,
  ): Promise<CommentsOrderResponseDto> {
    const [user, order] = await Promise.all([
      await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      }),
      await this.findOneByOrFail({ id: orderId }),
    ]);
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        ...dto,
        user: user,
        order: order.id,
      }),
    );

    return Comment_ordersMapper.toCommentResponseDto(comment);
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<Orders>,
    query: Orders_queryResponseDto,
  ): void {
    //const whereConditions = [];

    const filtersSearch = [
      { field: `orders.${ColumnsEnum.name}`, param: ColumnsEnum.name },
      { field: `orders.${ColumnsEnum.surname}`, param: ColumnsEnum.surname },
      { field: `orders.${ColumnsEnum.email}`, param: ColumnsEnum.email },
      { field: `orders.${ColumnsEnum.phone}`, param: ColumnsEnum.phone },
      { field: `orders.${ColumnsEnum.age}`, param: ColumnsEnum.age },
      { field: `orders.${ColumnsEnum.course}`, param: ColumnsEnum.course },
      {
        field: `orders.${ColumnsEnum.course_format}`,
        param: ColumnsEnum.course_format,
      },
      {
        field: `orders.${ColumnsEnum.course_type}`,
        param: ColumnsEnum.course_type,
      },
      { field: `orders.${ColumnsEnum.status}`, param: ColumnsEnum.status },
      { field: `orders.${ColumnsEnum.group}`, param: ColumnsEnum.group },
      { field: `orders.${ColumnsEnum.manager}`, param: ColumnsEnum.manager },
    ];

    // filters.forEach(filter => {
    //   if (query[filter.param]) {
    //     whereConditions.push(`orders.${filter.field} = :${filter.param}`);
    //   }
    // });
    //
    // if(whereConditions.length>0){
    //   queryBuilder.andWhere(whereConditions.join(' OR '));
    // }

    filtersSearch.forEach((filter) => {
      if (query[filter.param]) {
        // queryBuilder.andWhere(`${filter.field} = :${filter.param}`, { [filter.param]: query[filter.param] }); //по полному соответствию
        queryBuilder.andWhere(`${filter.field} LIKE :${filter.param}`, {
          [filter.param]: `%${query[filter.param]}%`,
        }); //по содержимому
      }
    });
  }

  private applySort(
    queryBuilder: SelectQueryBuilder<Orders>,
    sort: ColumnsEnum,
    order: OrderEnum,
  ) {
    switch (sort) {
      case ColumnsEnum.name:
        queryBuilder.orderBy('orders.name', order);
        break;
      case ColumnsEnum.surname:
        queryBuilder.orderBy('orders.surname', order);
        break;
      case ColumnsEnum.email:
        queryBuilder.orderBy('orders.email', order);
        break;
      case ColumnsEnum.phone:
        queryBuilder.orderBy('orders.phone', order);
        break;
      case ColumnsEnum.age:
        queryBuilder.orderBy('orders.age', order);
        break;
      case ColumnsEnum.course:
        queryBuilder.orderBy('orders.course', order);
        break;
      case ColumnsEnum.course_format:
        queryBuilder.orderBy('orders.course_format', order);
        break;
      case ColumnsEnum.course_type:
        queryBuilder.orderBy('orders.course_type', order);
        break;
      case ColumnsEnum.sum:
        queryBuilder.orderBy('orders.sum', order);
        break;
      case ColumnsEnum.alreadyPaid:
        queryBuilder.orderBy('orders.alreadyPaid', order);
        break;
      case ColumnsEnum.status:
        queryBuilder.orderBy('orders.status', order);
        break;
      case ColumnsEnum.group:
        queryBuilder.orderBy('orders.group.group', order);
        break;
      case ColumnsEnum.created_at:
        queryBuilder.orderBy('orders.created_at', order);
        break;
      case ColumnsEnum.manager:
        queryBuilder.orderBy('orders.users.manager', order);
        break;
      default:
        queryBuilder.orderBy('orders.id', order);
    }
  }

  private applyDateFilters(queryBuilder, start_date, end_date) {
    if (start_date && end_date) {
      const startDate = DateUtils.mixedDateToDateString(start_date);
      const endDate = DateUtils.mixedDateToDateString(end_date);
      queryBuilder.andWhere(
        `orders.created_at BETWEEN :start_date AND :end_date`,
        {
          start_date: startDate,
          end_date: endDate,
        },
      );
    } else if (start_date) {
      const startDate = DateUtils.mixedDateToDateString(start_date);
      queryBuilder.andWhere(`orders.created_at >= :start_date`, {
        start_date: startDate,
      });
    } else if (end_date) {
      const endDate = DateUtils.mixedDateToDateString(end_date);
      queryBuilder.andWhere(`orders.created_at <= :end_date`, {
        end_date: endDate,
      });
    }
  }
}
