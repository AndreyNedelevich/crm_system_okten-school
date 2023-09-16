import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EmailExistsException } from "../../../common/http";
import { ProfileEntity } from "../../../database/entities";
import { RolesService } from "../../roles/services/roles.service";
import { User_responseDto } from "../models/dtos/response";
import { UserRepository } from "./user.repository";
import { UserMapper } from "./user.mapper";
import { UserRoleEnum } from "../../roles/models/enums";

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private roleService: RolesService,
  ) {}

  async createAdminWithProfile(userDto): Promise<User_responseDto> {
    const findUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (findUser) {
      throw new EmailExistsException(userDto.email);
    }
    const [user, profileUser, roleUser] = await Promise.all([
      this.userRepository.save({
        ...userDto,
      }),
      this.profileRepository.save({
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      }),
      this.roleService.getRoleByValue(UserRoleEnum.ADMIN),
    ]);

    if (!user || !profileUser || !roleUser) {
      throw new BadRequestException('Invalid input data');
    }
    user.role = roleUser;
    user.profile = profileUser;
    await this.userRepository.save(user);

    return UserMapper.toResponseDto(user)
  }
}
