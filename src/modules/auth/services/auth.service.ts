import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import {
  EntityNotFoundException,
  InvalidTokenException,
} from '../../../common/http';
import { UserMapper } from '../../users/services/user.mapper';
import { UserRepository } from '../../users/services/user.repository';
import { UsersService } from '../../users/services/users.service';
import { TokenTypeEnum } from '../models';
import { ActivateManagerRequestDto } from '../models/dtos/request';
import {
  ActionTokenResponseDto,
  LoginResponseDto,
} from '../models/dtos/response';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private userService: UsersService,
    @InjectRedisClient() private redisClient: RedisClient,
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
    const token = await this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
      role: user.role.value,
    });

    return { token, user: UserMapper.toResponseDto(user) };
  }

  public getActivateToken(userId: string): Promise<ActionTokenResponseDto> {
    return this.tokenService.generateActionToken(userId);
  }

  public async activateManager(token: string, dto: ActivateManagerRequestDto) {
    const tokenFromRedis = await this.redisClient.get(token);

    if (token !== tokenFromRedis) {
      throw new InvalidTokenException();
    }

    const payload = this.tokenService.verifyToken(token, TokenTypeEnum.Action);
    if (!payload) {
      throw new InvalidTokenException();
    }
    const userId = +payload.id;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new EntityNotFoundException();
    } else if (user.is_active === true) {
      throw new BadRequestException('User is already active');
    } else {
      user.password = dto.password;
      await this.userRepository.save(user);
      return { message: 'Data saved successfully' };
    }
  }
}
