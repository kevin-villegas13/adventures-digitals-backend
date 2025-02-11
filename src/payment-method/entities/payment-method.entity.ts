import { Bill } from 'src/bill/entities/bill.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER'] })
  type: 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER';

  @Column()
  lastFourDigits: string;

  @Column({ nullable: true })
  provider?: string;

  @Column({ nullable: true })
  email?: string;

  @ManyToOne(() => User, (user) => user.paymentMethods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Bill, (bill) => bill.paymentMethods)
  bills: Bill[];
}
