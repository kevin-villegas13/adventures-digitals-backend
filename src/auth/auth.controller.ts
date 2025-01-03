import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth-register.Dto";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, nombre, apellido, ciudad, zonaPostal } = req.body;

    // Crear el DTO a partir de los datos enviados
    const authRegisterDto: AuthRegisterDto = {
      email,
      password,
      nombre,
      apellido,
      ciudad,
      zonaPostal,
    };

    try {
      // Llamar al servicio de registro para registrar el usuario
      const result = await new AuthService().register(authRegisterDto);
      res.status(201).json(result);
    } catch (error: any) {
      // Enviar un error si ocurre
      res.status(400).json({ message: error.message });
    }
  }
}
