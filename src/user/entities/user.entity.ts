import { BaseEntity } from 'src/common/base.entity';
import {
  Entity,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../../role/entity/role.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { Bill } from 'src/bill/entities/bill.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postalCode: number;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  @ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  bills: Bill[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];
}
