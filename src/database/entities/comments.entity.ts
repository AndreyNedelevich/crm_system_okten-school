import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Orders } from './orders.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  comment: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  //@JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => Orders, (order) => order.comments)
  order: Orders;
}
