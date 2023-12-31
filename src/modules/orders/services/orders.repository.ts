import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { DateUtils } from 'typeorm/util/DateUtils';

import { PaginatedDto } from '../../../common/decorators';
import { OrderEnum } from '../../../common/models';
import { IUserData } from '../../../common/models/interfaces';
import { Orders } from '../../../database/entities';
import { CommentsRepository } from '../../comments/services/comments.repository';
import { GroupsRepository } from '../../groups/services/groups.repository';
import { UserRepository } from '../../users/services/user.repository';
import {
  Orders_editRequestDto,
  Orders_excel_queryRequestDto,
  Orders_queryRequestDto,
} from '../models/dtos/request';
import {
  CommentsOrderResponseDto,
  Orders_statisticResponseDto,
  OrdersResponseDto,
} from '../models/dtos/response';
import { ColumnsEnum, StatusEnum } from '../models/enums';
import { OrdersMapper } from './orders.mapper';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(
    private readonly groupRepository: GroupsRepository,
    private readonly commentRepository: CommentsRepository,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {
    super(Orders, dataSource.manager);
  }

  public async getAllOrders(
    query: Orders_queryRequestDto,
  ): Promise<PaginatedDto<OrdersResponseDto>> {
    query.order = query.order || OrderEnum.ASC;
    const page = +query.page || 1;
    const limit = +query.limit || 25;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.groups', 'group')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
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

  async editOrder(orderId, dto: Orders_editRequestDto, currentUser: IUserData) {
    const order = await this.createQueryBuilder('orders')
      .where('orders.id = :orderId', { orderId: orderId })
      .leftJoinAndSelect('orders.groups', 'group')
      .leftJoinAndSelect('orders.user', 'user')
      .getOne();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order?.user?.id != null && currentUser.id !== order.user.id) {
      throw new ForbiddenException('This user is not manager to this order');
    }

    if (dto.hasOwnProperty('status')) {
      if (dto.status === StatusEnum.New) {
        order.user = null;
      } else {
        order.user = await this.userRepository.findOne({
          where: { id: currentUser.id },
        });
      }
    }
    if (dto?.group) {
      order.groups = await this.groupRepository.findOne({
        where: { id: dto.group },
      });
    }

    if (dto?.status || dto?.group) {
      await this.save(order);
      delete dto.group;
    }

    await this.update(orderId, dto);
    return { message: 'Data update was successful' };
  }

  async createNewCommentForOrder(
    orderId,
    dto,
    currentUser,
  ): Promise<CommentsOrderResponseDto> {
    const [user, order] = await Promise.all([
      await this.userRepository.findOne({
        where: { id: currentUser.id },
        relations: ['profile'],
      }),
      await this.findOneByOrFail({ id: orderId }),
    ]);
    if (!order) {
      throw new BadRequestException(`Order by ${orderId} do not found`);
    }

    const comment = await this.commentRepository.save(
      this.commentRepository.create({
        ...dto,
        user: user,
        order: order.id,
      }),
    );

    if (comment) {
      order.user = user;
      await this.save(order);
    } else {
      throw new BadRequestException('Manager is not saved for this order');
    }

    return OrdersMapper.toCommentResponseDto(comment);
  }

  public async getOrdersStatistic(
    userId?: number,
  ): Promise<Orders_statisticResponseDto> {
    const queryBuilder = this.createQueryBuilder('orders')
      .select("COALESCE(orders.status, 'Unknown')", 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy("COALESCE(orders.status, 'Unknown')");

    if (userId) {
      queryBuilder.where('orders.user.id = :userId', { userId });
    }

    const statuses = await queryBuilder.getRawMany();

    const totalCount = statuses.reduce(
      (total, status) => total + parseInt(status.count, 10),
      0,
    );

    return {
      total_count: totalCount,
      statuses: statuses.map((status) => ({
        status: status.status === 'Unknown' ? 'not status' : status.status,
        count: parseInt(status.count, 10),
      })),
    };
  }

  public async getOrdersExelTable(
    query: Orders_excel_queryRequestDto,
  ): Promise<OrdersResponseDto[]> {
    query.order = query.order || OrderEnum.ASC;

    const queryBuilder = this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.groups', 'group')
      .leftJoinAndSelect('orders.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile');

    this.applyFilters(queryBuilder, query);
    this.applyDateFilters(queryBuilder, query.start_date, query.end_date);
    this.applySort(queryBuilder, query.sort, query.order);

    return await queryBuilder.getMany();
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<Orders>,
    query: Orders_queryRequestDto,
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
      { field: `orders.groups.id`, param: ColumnsEnum.group },
      { field: `orders.user.id`, param: ColumnsEnum.manager },
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
