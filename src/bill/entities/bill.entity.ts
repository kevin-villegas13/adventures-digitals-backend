import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { Detail } from './detail.entity';
import { Transaction } from './transaction.entity';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.bills)
  @JoinTable({
    name: 'bill_has_payment_methods',
    joinColumn: { name: 'bill_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'payment_method_id',
      referencedColumnName: 'id',
    },
  })
  paymentMethods: PaymentMethod[];

  @ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Detail, (detail) => detail.bill, { cascade: true })
  details: Detail[];

  @OneToMany(() => Transaction, (transaction) => transaction.bill, {
    cascade: true,
  })
  transactions: Transaction[];
}
