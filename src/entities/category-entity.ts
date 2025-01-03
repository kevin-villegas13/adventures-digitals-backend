import { Entity, Column, OneToMany } from "typeorm";
import { Producto } from "./product-entity";
import { BaseEntity } from "../common/helper/base-entity";

@Entity("categoria")
export class Categoria extends BaseEntity {
  @Column()
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
