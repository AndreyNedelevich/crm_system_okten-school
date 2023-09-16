import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserRoleEnum } from "../../modules/roles/models/enums";

@Entity({ name: 'roles' })
export class RoleEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ADMIN,MANAGER',
    nullable: false,
    description: 'Оnly ADMIN or MANAGER',
  })
  @Column({  type: 'enum', enum: UserRoleEnum , nullable: false })
  value: UserRoleEnum;

  @ApiProperty({
    example: 'Main role',
    nullable: true,
    description: 'Описание роли',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
