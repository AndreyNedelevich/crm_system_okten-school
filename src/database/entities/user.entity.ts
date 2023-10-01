import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CommentsEntity } from './comments.entity';
import { ProfileEntity } from './profile.entity';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
    transformer: [lowerCaseTransformer],
  })
  email: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_active: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    nullable: true,
    transformer: [passwordHashTransformer],
  })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];
}
