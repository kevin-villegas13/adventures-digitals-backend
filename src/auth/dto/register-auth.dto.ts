import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsString, Matches } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Matches(/^(?=.*)(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/, {
    message: 'Las contraseñas deben coincidir',
  })
  repeatPassword: string;
}
