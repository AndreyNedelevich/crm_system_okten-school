import { BadRequestException, Injectable } from '@nestjs/common';

import {
  EmailExistsException,
  EntityNotFoundException,
} from '../../../common/http';
import { User_responseDto } from '../models/dtos/response';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

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
      relations: ['profile', 'role'],
    });
    if (!findUser) {
      throw new EntityNotFoundException();
    }
    return UserMapper.toResponseDto(findUser);
  }

  public async banUser(userId: number): Promise<{ message: string }> {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new EntityNotFoundException();
    }
    if (findUser.is_active === false) {
      throw new BadRequestException('User already baned');
    }
    findUser.is_active = false;
    await this.userRepository.save(findUser);
    return { message: `${findUser.profile.firstName} was baned` };
  }
  public async unbanUser(userId: number): Promise<{ message: string }> {
    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new EntityNotFoundException();
    }
    if (findUser.is_active === true) {
      throw new BadRequestException('User already unbaned');
    }
    findUser.is_active = true;
    await this.userRepository.save(findUser);
    return { message: `${findUser.profile.firstName} was unbaned` };
  }
}
