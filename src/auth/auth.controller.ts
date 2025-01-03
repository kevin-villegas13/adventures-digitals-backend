import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth-register.Dto";
import { AuthLoginDto } from "./dto/auth-login.dto";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Eliminar "static" para que los métodos puedan acceder correctamente a "this.authService"
  async register(req: Request, res: Response) {
    const { email, password, nombre, apellido, ciudad, zonaPostal } = req.body;

    const authRegisterDto: AuthRegisterDto = {
      email,
      password,
      nombre,
      apellido,
      ciudad,
      zonaPostal,
    };

    try {
      const result = await this.authService.register(authRegisterDto);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifyPassword(req: Request, res: Response) {
    const { email, password } = req.body;

    const authLoginDto: AuthLoginDto = {
      email,
      password,
    };

    try {
      const isValid = await this.authService.verifyPassword(authLoginDto);

      if (isValid) {
        res.status(200).json({ message: "Password is valid" });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const authLoginDto: AuthLoginDto = {
      email,
      password,
    };

    try {
      const token = await this.authService.login(authLoginDto);
      res.status(200).json(token);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
