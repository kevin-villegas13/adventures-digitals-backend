import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../common/base-entity";
import { Producto } from "./product-entity";

@Entity("categoria")
export class Categoria extends BaseEntity {
  @Column()
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
