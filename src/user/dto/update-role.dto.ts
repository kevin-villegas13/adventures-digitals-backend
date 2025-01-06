import { IsEnum, IsString } from "class-validator";
import { RolTipo } from "../../entities/rol-entity";

export class UpdateRoleDto {
  @IsString()
  @IsEnum(RolTipo, {
    message: "Rol debe ser uno de los siguientes: comprador, vendedor",
  })
  newRole: string;
}
