import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Orders } from './orders.entity';

@Entity({ name: 'groups' })
export class GroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Orders, (orders) => orders.groups)
  order: Orders[];
}
