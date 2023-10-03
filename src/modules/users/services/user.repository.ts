import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CryptoHelper } from '../../../common/helpers';
import { UserEntity } from '../../../database/entities';
import { ProfileRepository } from '../../profile/services/profile.repository';
import { UserRoleEnum } from '../../roles/models/enums';
import { RolesService } from '../../roles/services/roles.service';
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
