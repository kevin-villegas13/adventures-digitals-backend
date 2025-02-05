import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Detail } from './detail.entity';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @ManyToMany(() => PaymentMethod)
  @JoinTable({
    name: 'bill_has_payment_methods',
    joinColumn: {
      name: 'bill_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'payment_method_id',
      referencedColumnName: 'id',
    },
  })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Detail, (detail) => detail.bill, { cascade: true })
  details: Detail[];
}
