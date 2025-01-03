import { IsEmail, IsString } from "class-validator";

export class AuthLoginDto {
  @IsEmail({}, { message: "El correo no tiene un formato válido" })
  email: string;

  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  password: string;
}
