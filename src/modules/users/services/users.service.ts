import { BadRequestException, Injectable } from '@nestjs/common';

import { PaginatedDto } from '../../../common/decorators';
import {
  EmailExistsException,
  EntityNotFoundException,
} from '../../../common/http';
import { UserRoleEnum } from '../../roles/models/enums';
import { Status_IsActiveEnum } from '../models/dtos/enums/status_IsActive.enum';
import { Users_queryRequestDto } from '../models/dtos/request/users_query.request.dto';
import { User_responseDto } from '../models/dtos/response';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(
    query: Users_queryRequestDto,
  ): Promise<PaginatedDto<User_responseDto>> {
    return await this.userRepository.getAllUsers(query);
  }

  async createUserWithProfile(userDto): Promise<User_responseDto> {
    const findUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (findUser) {
      throw new EmailExistsException(userDto.email);
    }
    return await this.userRepository.createUserWithProfile(userDto);
  }

  public async currentUser(userId: number): Promise<User_responseDto> {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
      // relations: [],  что бы связанные сущности не подтягивались
    });
    if (!findUser) {
      throw new EntityNotFoundException();
    }
    return UserMapper.toResponseDto(findUser);
  }

  public async ban_unbanUser(
    userId: number,
    nameReq: Status_IsActiveEnum,
  ): Promise<{ message: string }> {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
    });

    if (!findUser) {
      throw new EntityNotFoundException();
    } else if (findUser.role.value === UserRoleEnum.ADMIN) {
      throw new BadRequestException(
        'User with admin role can not baned or unbanned',
      );
    } else if (nameReq === Status_IsActiveEnum.unban) {
      if (findUser.is_active === true) {
        throw new BadRequestException('User  already unbaned');
      }
      findUser.is_active = true;
    } else if (nameReq === Status_IsActiveEnum.ban) {
      if (findUser.is_active === false) {
        throw new BadRequestException('User already baned');
      }
      findUser.is_active = false;
    }
    await this.userRepository.save(findUser);
    return {
      message: `Manager was ${
        nameReq === Status_IsActiveEnum.unban ? 'unbanned' : 'banned'
      }`,
    };
  }
}
