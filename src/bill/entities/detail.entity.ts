import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Bill } from './bill.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('detail')
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  unitPrice: number;

  // Relación con Factura (Bill)
  @ManyToOne(() => Bill, (bill) => bill.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;

  @ManyToOne(() => Product, (product) => product.details, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
