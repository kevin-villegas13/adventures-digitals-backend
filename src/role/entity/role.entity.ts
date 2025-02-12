import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { RoleType } from '../enum/role.type';
import { User } from '../../user/entities/user.entity';

@Entity('role')
export class Role extends BaseEntity {
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.BUYER,
    nullable: true,
  })
  type: RoleType;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
