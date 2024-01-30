import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../../../database/entities';
import { CreateRoleDto } from '../models/dtos/response';
import { UserRoleEnum } from '../models/enums';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<RoleEntity> {
    const value = dto.value;
    const findRole = await this.roleRepository.findOne({ where: { value } });
    if (findRole) {
      throw new BadRequestException('This role alredy exist');
    }
    return await this.roleRepository.save(this.roleRepository.create(dto));
  }

  async getRoleByValue(value: UserRoleEnum): Promise<RoleEntity> {
    const findRole = await this.roleRepository.findOne({ where: { value } });
    if (!findRole) {
      throw new BadRequestException("This role doesn't exist");
    }
    return findRole;
  }
}
