import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { BaseEntity } from "../common/base-entity";
import { Factura } from "./factura-entity";
import { Producto } from "./product-entity";

@Entity("detalle")
export class Detalle extends BaseEntity {
  @Column()
  cantidad: number;

  @Column("decimal", { precision: 10, scale: 0 })
  precioUnitario: number;

  @ManyToOne(() => Factura, (factura) => factura.detalles)
  factura: Factura;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  producto: Producto;
}
