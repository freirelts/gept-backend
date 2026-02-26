import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email deve conter um formato válido' })
  email: string;

  @IsNotEmpty()
  @IsString({ message: 'Senha deve ser string' })
  password: string;
}
