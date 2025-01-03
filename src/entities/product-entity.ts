import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Categoria } from "./category-entity";
import { Detalle } from "./detalle-entity";
import { BaseEntity } from "../common/helper/base-entity";

@Entity("producto")
export class Producto extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  marca: string;

  @Column()
  precio: string;

  @Column()
  stock: string;

  @Column()
  calificacion: number;

  @Column()
  fechaPublicacion: Date;

  @Column()
  imagen: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @OneToMany(() => Detalle, (detalle) => detalle.producto)
  detalles: Detalle[];
}
