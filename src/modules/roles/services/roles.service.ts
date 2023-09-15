import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../../../database/entities';
import { CreateRoleDto } from '../models/dtos/response';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
    try {
      return this.roleRepository.create(dto);
    } catch {
      throw new BadRequestException('Invalid input data');
    }
  }

  async getRoleByValue(value: string) {
    try {
      await this.roleRepository.findOne({ where: { value } });
    } catch {
      throw new HttpException('Data not find', HttpStatus.BAD_REQUEST);
    }
  }
}
