import { Entity, Column, ManyToMany } from "typeorm";
import { Usuario } from "./user-enity";
import { BaseEntity } from "../common/helper/base-entity";

// Definir el Enum
export enum RolTipo {
  COMPRADOR = "comprador",
  VENDEDOR = "vendedor",
}

@Entity("rol")
export class Rol extends BaseEntity {
  @Column({
    type: "enum",
    enum: RolTipo,
    default: RolTipo.COMPRADOR,
  })
  tipo: RolTipo;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios: Usuario[];
}
