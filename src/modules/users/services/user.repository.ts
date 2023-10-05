import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PaginatedDto } from '../../../common/decorators';
import { CryptoHelper } from '../../../common/helpers';
import { UserEntity } from '../../../database/entities';
import { ProfileRepository } from '../../profile/services/profile.repository';
import { UserRoleEnum } from '../../roles/models/enums';
import { RolesService } from '../../roles/services/roles.service';
import { Users_queryRequestDto } from '../models/dtos/request/users_query.request.dto';
import { User_responseDto } from '../models/dtos/response';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    private roleService: RolesService,
    private readonly profileRepository: ProfileRepository,
    private readonly dataSource: DataSource,
  ) {
    super(UserEntity, dataSource.manager);
  }

  public async getAllUsers(
    query: Users_queryRequestDto,
  ): Promise<PaginatedDto<User_responseDto>> {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const offset = (page - 1) * limit;

    const queryBuilder = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.role', 'role');

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
  async createUserWithProfile(userDto): Promise<User_responseDto> {
    const [user, profileUser, roleUser] = await Promise.all([
      this.save({
        ...userDto,
      }),
      this.profileRepository.save({
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      }),
      this.roleService.getRoleByValue(UserRoleEnum.MANEGER),
    ]);

    if (!user || !profileUser || !roleUser) {
      throw new BadRequestException('Invalid input data');
    }
    user.role = roleUser;
    user.profile = profileUser;
    await this.save(user);
    return UserMapper.toResponseDto(user);
  }

  public async authorize(email: string, password: string): Promise<UserEntity> {
    const queryBuilder = this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.password = :password', {
        password: CryptoHelper.hashPassword(password),
      });
    return await queryBuilder.getOne();
  }
}
