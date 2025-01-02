import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "../common/base-entity";
import { Factura } from "./factura-entity";

@Entity("metodopago")
export class MetodoPago extends BaseEntity {
  @Column()
  descripcion: string;

  @Column()
  estado: number;

  @ManyToMany(() => Factura, (factura) => factura.metodoPagos)
  facturas: Factura[];
}
