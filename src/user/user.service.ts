import { AppDataSource } from "../database/database";
import { Usuario } from "../entities/user-enity";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { extractTokenFromHeader } from "../auth/utils/token.utils";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Rol, RolTipo } from "../entities/rol-entity";

export class UserService {
  private readonly usuarioRepository = AppDataSource.getRepository(Usuario);
  private readonly rolRepository = AppDataSource.getRepository(Rol);

  async getUserFromToken(req: Request) {
    const token = extractTokenFromHeader(req);
    if (!token) throw new Error("Token missing or invalid");

    try {
      // Verifica y decodifica el token
      const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

      const user = await this.usuarioRepository.findOne({
        where: { id: payload.id },
        relations: ["roles"],
      });
      if (!user) throw new Error("User not found");

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  async updateUserRole(
    req: Request,
    updateRoleDto: UpdateRoleDto
  ): Promise<{ success: boolean; role?: string; error?: string }> {
    const { newRole } = updateRoleDto;

    const token = extractTokenFromHeader(req);

    if (!token) return { success: false, error: "Token missing or invalid" };

    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

      const user = await this.usuarioRepository.findOne({
        where: { id: payload.id },
        relations: ["roles"],
      });

      if (!user) return { success: false, error: "User not found" };

      // Validar el nuevo rol
      if (!Object.values(RolTipo).includes(newRole as RolTipo))
        return { success: false, error: `Role '${newRole}' is not valid` };

      const role = await this.rolRepository.findOne({
        where: { tipo: newRole as RolTipo },
      });

      if (!role)
        return {
          success: false,
          error: `Role '${newRole}' not found in the database`,
        };

    
      user.roles = [role];

      await this.usuarioRepository.save(user);

      return { success: true, role: role.tipo };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "An error occurred while updating the role",
      };
    }
  }
}
