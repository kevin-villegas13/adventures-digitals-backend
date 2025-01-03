import { Entity, Column, ManyToMany } from "typeorm";
import { Factura } from "./factura-entity";
import { BaseEntity } from "../common/helper/base-entity";

@Entity("metodopago")
export class MetodoPago extends BaseEntity {
  @Column()
  descripcion: string;

  @Column()
  estado: number;

  @ManyToMany(() => Factura, (factura) => factura.metodoPagos)
  facturas: Factura[];
}
