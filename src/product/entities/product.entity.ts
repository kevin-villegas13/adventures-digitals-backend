import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Detail } from 'src/bill/entities/detail.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity('product')
export class Product extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  stock: number;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category: Category;

  @OneToMany(() => Detail, (detail) => detail.product)
  details: Detail[];
}
