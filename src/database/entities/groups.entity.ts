import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Orders } from './orders.entity';

@Entity({ name: 'groups' })
export class GroupsEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'JavaScript Complex',
    nullable: false,
    description: 'Group name',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Orders, (orders) => orders.group)
  order: Orders[];
}
