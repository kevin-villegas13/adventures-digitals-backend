import {
  IsEmail,
  IsOptional,
  IsString,
  IsArray,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: number;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @MinLength(6, {
    message: 'La confirmación de contraseña debe tener al menos 6 caracteres',
  })
  confirmPassword: string;

  @IsOptional()
  @IsArray()
  roleIds?: number[];
}
