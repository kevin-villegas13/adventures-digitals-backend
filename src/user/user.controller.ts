import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  async getUserInfo(req: Request, res: Response) {
    try {
      const user = await userService.getUserFromToken(req);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al obtener información del usuario",
        error: error.message,
      });
    }
  }

  async updateRole(req: Request, res: Response) {
    const { newRole } = req.body;

    try {
      const user = await userService.updateUserRole(req, { newRole });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: "Error al obtener información del usuario",
        error: error.message,
      });
    }
  }
}
