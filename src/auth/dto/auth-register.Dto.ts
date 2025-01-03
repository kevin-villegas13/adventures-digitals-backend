import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class AuthRegisterDto {
  @IsEmail({}, { message: "Por favor ingresa un correo electrónico válido." })
  @IsOptional()
  email?: string;

  @IsString({ message: "La contraseña debe ser una cadena de texto." })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres." })
  password: string;

  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @IsOptional()
  nombre?: string;

  @IsString({ message: "El apellido debe ser una cadena de texto." })
  @IsOptional()
  apellido?: string;

  @IsString({ message: "La ciudad debe ser una cadena de texto." })
  @IsOptional()
  ciudad?: string;

  @IsString({ message: "La zona postal debe ser una cadena de texto." })
  @IsOptional()
  zonaPostal?: string;
}
