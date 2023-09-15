import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileEntity, UserEntity } from '../../../database/entities';
import { RolesService } from '../../roles/services/roles.service';
import { Admin_responseDto } from '../models/dtos/response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private roleService: RolesService,
  ) {}

  async createAdminWithProfile(userDto): Promise<Admin_responseDto> {
    // const user = await this.userRepository.save({
    //   ...userDto,
    // });
    // const profileUser = await this.profileRepository.save({
    //   firstName: userDto.firstName,
    //   lastName: userDto.lastName,
    // });
    //
    // const roleUser = await this.roleService.getRoleByValue('ADMIN');

    const [user, profileUser, roleUser] = await Promise.all([
      this.userRepository.save({
        ...userDto,
      }),
      this.profileRepository.save({
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      }),
      this.roleService.getRoleByValue('ADMIN'),
    ]);

    if (user || profileUser || roleUser) {
      user.role = roleUser;
      user.profile = profileUser;

      await this.userRepository.save(user);

      const adminResponse: Admin_responseDto = {
        id: user.id,
        email: user.email,
        is_active: user.is_active,
        profile: user.profile,
        role: user.role,
      };

      return adminResponse;
    } else {
      throw new BadRequestException('Something wrong');
    }
  }
}
