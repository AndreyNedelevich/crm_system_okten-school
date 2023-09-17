import { Injectable } from '@nestjs/common';

//import { UserCreateRequestDto } from '../../user/models/dtos/request';
import { UserMapper } from "../../users/services/user.mapper";
import { UserRepository } from "../../users/services/user.repository";
import { ActionTokenResponseDto, LoginResponseDto } from "../models/dtos/response";
import { TokenService } from './token.service';
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../../../database/entities";
import { Repository } from "typeorm";
import { UserCreateRequestDto } from "../../users/models/dtos/request";
import { UsersService } from "../../users/services/users.service";

@Injectable()
export class AuthService {
  constructor(
      private userRepository: UserRepository,
      private tokenService: TokenService,
      private userService: UsersService
  ) {}

  public async login(userId: number): Promise<LoginResponseDto> {
    const user = await this.userRepository
      .createQueryBuilder('user')
       .leftJoinAndSelect('user.profile', 'profile')
       .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :userId', { userId })
      .getOne();

    // const user= await this.userRepository.findOne({
    //   where: { id: userId },
    //   relations: ['role'],
    //   // relations: ['profile', 'roles'],
    // });



    const token = this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
      role: user.role.value
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }

  public async registrManager(dto: UserCreateRequestDto): Promise<ActionTokenResponseDto> {

    const user = await this.userService.createUserWithProfile(dto);

    const actionToken = this.tokenService.generateActionToken({
      id: user.id,
      email: user.email,
      role: user.role.value
    });

    return  actionToken ;
  }
}