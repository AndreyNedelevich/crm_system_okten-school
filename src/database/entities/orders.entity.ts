import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CommentsEntity } from './comments.entity';
import { GroupsEntity } from './groups.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'varchar', length: 25, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  surname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  course: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  course_format: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  course_type: string;

  @Column({ type: 'int', nullable: true })
  sum: number;

  @Column({ type: 'int', nullable: true })
  alreadyPaid: number;

  @Column({ type: 'datetime', nullable: true })
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  utm: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  msg: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => GroupsEntity, (groups) => groups.order)
  @JoinColumn({ name: 'groupId' })
  groups: GroupsEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.order)
  comments: CommentsEntity[];
}
