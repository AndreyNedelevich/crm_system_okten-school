import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

//import { UserCreateRequestDto } from '../../user/models/dtos/request';
import { UserMapper } from "../../users/services/user.mapper";
import { UserRepository } from "../../users/services/user.repository";
import { ActionTokenResponseDto, LoginResponseDto } from "../models/dtos/response";
import { TokenService } from './token.service';
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateRequestDto } from "../../users/models/dtos/request";
import { UsersService } from "../../users/services/users.service";
import { User_responseDto } from "../../users/models/dtos/response";
import { ActivateManagerRequestDto } from "../models/dtos/request";
import { TokenTypeEnum } from "../models";
import { EntityNotFoundException, InvalidTokenException } from "../../../common/http";

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

    const token = this.tokenService.generateAuthToken({
      id: user.id,
      email: user.email,
      role: user.role.value
    });
    return { token, user: UserMapper.toResponseDto(user) };
  }

  public async registrManager(dto: UserCreateRequestDto): Promise<User_responseDto> {
    const user = await this.userService.createUserWithProfile(dto);
    if(!user){
      throw new BadRequestException('Invalid input data');
    }
    return  user ;
  }

  public async getActivateToken (userId:string):Promise<ActionTokenResponseDto> {
    const {actionToken} = this.tokenService.generateActionToken(userId);
    const response=await this.redisClient.setEx(actionToken, 43200, actionToken);
    if(!response){
      throw new BadRequestException('Something wrong');
    }
    return {actionToken};
  }

  public async activateManager (token:string,dto:ActivateManagerRequestDto){
    const tokenFromRedis = await this.redisClient.get(token)
    const payload = this.tokenService.verifyToken(
      tokenFromRedis,
      TokenTypeEnum.Action,
    );
    if (!payload) {
      throw new InvalidTokenException();
    }
    const userId=+payload.id
    const user= await this.userRepository.findOne({
      where: { id: userId },
    });
    if(user){
      throw new EntityNotFoundException()
    }
    user.password=dto.password;
    await this.userRepository.save(user);
    return 'The manager is activated and password created'
  }
}