import { Entity, Column, Unique, ManyToMany, JoinTable } from "typeorm";
import { Rol } from "./rol-entity";
import { BaseEntity } from "../common/helper/base-entity";

@Entity("usuario")
@Unique(["email"])
export class Usuario extends BaseEntity {
  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  ciudad: string;

  @Column()
  zonaPostal: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  @JoinTable({
    name: "usuario_has_roles",
    joinColumn: { name: "usuarioId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "rolId", referencedColumnName: "id" },
  })
  roles: Rol[];
}
