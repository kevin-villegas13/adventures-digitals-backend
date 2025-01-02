import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../common/base-entity";
import { MetodoPago } from "./metodoPago-entity";
import { Detalle } from "./detalle-entity";

@Entity("factura")
export class Factura extends BaseEntity {
  @Column()
  fecha: Date;

  @Column("decimal", { precision: 10, scale: 0 })
  total: number;

  @Column()
  estado: number;

  @OneToMany(() => Detalle, (detalle) => detalle.factura)
  detalles: Detalle[];

  @ManyToMany(() => MetodoPago)
  @JoinTable({
    name: "MetodoPago_has_Factura",
    joinColumn: {
      name: "Factura_idFactura",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "MetodoPago_idMetodoPago",
      referencedColumnName: "id",
    },
  })
  metodoPagos: MetodoPago[];
}
