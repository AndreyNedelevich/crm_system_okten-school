import { Injectable } from '@nestjs/common';

//import { UserCreateRequestDto } from '../../user/models/dtos/request';
import { UserMapper } from "../../users/services/user.mapper";
import { UserRepository } from "../../users/services/user.repository";
import { LoginResponseDto } from "../models/dtos/response/login.response.dto";
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
      private userRepository: UserRepository,
      private tokenService: TokenService,
  ) {}

  public async login(userId: number): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    const token = this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
      role: user.role.value
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }

  // public async signUp(dto: UserCreateRequestDto): Promise<LoginResponseDto> {
  //   const user = await this.userRepository.save(
  //       this.userRepository.create(dto),
  //   );
  //
  //   const token = this.tokenService.generateAuthToken({
  //     id: user.id,
  //     email: user.email,
  //   });
  //
  //   return { token, user: UserMapper.toResponseDto(user) };
  // }
}