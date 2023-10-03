import { Injectable } from '@nestjs/common';

import { EmailExistsException } from '../../../common/http';
import { User_responseDto } from '../models/dtos/response';
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
    // const [user, profileUser, roleUser] = await Promise.all([
    //   this.userRepository.save({
    //     ...userDto,
    //   }),
    //   this.profileRepository.save({
    //     firstName: userDto.firstName,
    //     lastName: userDto.lastName,
    //   }),
    //   this.roleService.getRoleByValue(UserRoleEnum.MANEGER),
    // ]);
    //
    // if (!user || !profileUser || !roleUser) {
    //   throw new BadRequestException('Invalid input data');
    // }
    // user.role = roleUser;
    // user.profile = profileUser;
    // await this.userRepository.save(user);
    // return UserMapper.toResponseDto(user);
  }
}
