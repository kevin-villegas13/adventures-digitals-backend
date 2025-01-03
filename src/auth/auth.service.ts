import { AppDataSource } from "../database/database";
import { Usuario } from "../entities/user-enity";
import { Rol, RolTipo } from "../entities/rol-entity";
import { AuthRegisterDto } from "./dto/auth-register.Dto";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { IAccessToken } from "./interface/accesstoke.interface";

export class AuthService {
  private readonly userRepository = AppDataSource.getRepository(Usuario);
  private readonly rolRepository = AppDataSource.getRepository(Rol);
  private readonly jwtSecret: string | undefined;
  private readonly expireTime: string | undefined;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.expireTime = process.env.JWT_EXPIRE_TIME;
  }

  async register(authRegisterDto: AuthRegisterDto): Promise<IAccessToken> {
    const { email, password, zonaPostal } = authRegisterDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) throw new Error("Email is already registered");

    // Encriptar la contraseña
    const hashedPassword = await argon2.hash(password);

    // Obtener el rol "comprador"
    let compradorRol = await this.rolRepository.findOne({
      where: { tipo: RolTipo.COMPRADOR },
    });

    if (!compradorRol) {
      compradorRol = this.rolRepository.create({
        tipo: RolTipo.COMPRADOR,
      });
      await this.rolRepository.save(compradorRol);
    }

    const zonaPostalNumber = zonaPostal ? Number(zonaPostal) : undefined;

    // Crear y guardar el usuario con el rol "comprador"
    const user = this.userRepository.create({
      ...authRegisterDto,
      password: hashedPassword,
      zonaPostal: zonaPostalNumber,
      roles: [compradorRol],
    });

    await this.userRepository.save(user);

    if (!email) throw new Error("Email is required");

    const token = await this.generateToken(email);

    return token;
  }

  async generateToken(email: string): Promise<IAccessToken> {
    // Crear el payload para el JWT (solo el correo)
    const payload = { sub: email };

    // Generar el token JWT usando la clave secreta desde el entorno
    const access_token = jwt.sign(payload, this.jwtSecret!, {
      expiresIn: this.expireTime,
    });

    return {
      token: access_token,
    };
  }
}
