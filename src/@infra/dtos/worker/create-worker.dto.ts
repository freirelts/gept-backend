import { AcessLevelEnum } from '@domain/enums/acess-level.enum';
import { PositionEnum } from '@domain/enums/position.enum';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsArray,
  IsDateString,
  Length,
  IsEnum,
} from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Data de nascimento é obrigatório' })
  birthdate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Cargo é obrigatório' })
  @IsEnum(PositionEnum)
  position: string;

  @IsString()
  @IsNotEmpty({ message: 'Nível de acesso é obrigatório' })
  @IsEnum(AcessLevelEnum)
  accessLevel: string;

  @IsString()
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  phone: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'WhatsApp é obrigatório' })
  isWhatsApp: boolean;

  @IsString()
  @IsNotEmpty({ message: 'Rua é obrigatório' })
  street: string;

  @IsString()
  @IsNotEmpty({ message: 'Número é obrigatório' })
  number: string;

  @IsString()
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  neighborhood: string;

  @IsString()
  @IsNotEmpty({ message: 'Cidade é obrigatório' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @Length(8, 8, { message: 'CEP deve conter 8 dígitos' })
  postalCode: string;

  @IsString()
  complement: string;

  @IsArray()
  projects: Array<string>;
}
