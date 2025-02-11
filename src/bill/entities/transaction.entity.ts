import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Bill } from './bill.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';

@Entity('transaction')
export class Transaction extends BaseEntity {
  @ManyToOne(() => Bill, (bill) => bill.transactions, { onDelete: 'CASCADE' })
  bill: Bill;

  @ManyToOne(() => PaymentMethod, { nullable: true })
  paymentMethod: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
