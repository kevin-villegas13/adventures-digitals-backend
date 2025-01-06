import { Rol, RolTipo } from "../entities/rol-entity";
import { AppDataSource } from "./database";

export const insertRolesIfNotExist = async () => {
  const rolRepository = AppDataSource.getRepository(Rol);

  // Verificar si los roles ya existen
  const rolesExist = await rolRepository.find();

  if (rolesExist.length === 0) {
    // Si no existen, insertarlos
    const roles = [{ tipo: RolTipo.COMPRADOR }, { tipo: RolTipo.VENDEDOR }];

    await rolRepository.save(roles);
    console.log("Roles insertados.");
  } else {
    console.log("Los roles ya existen.");
  }
};
