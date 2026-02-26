import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  Length,
  ArrayMinSize,
} from 'class-validator';
import { DaysOfWeek } from '@domain/enums/days-of-week';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidateDaysOfWeek', async: false })
export class ValidateDaysOfWeek implements ValidatorConstraintInterface {
  validate(values: string[], args: ValidationArguments) {
    let isValid = false;

    values.forEach((day) => {
      const daysOfWeek = Object.values(DaysOfWeek) as string[];

      isValid = daysOfWeek.includes(day);
    });

    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return 'daysOfWork must contain any of the following values: monday, tuesday, wednesday, thursday, friday, saturday, sunday';
  }
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  description: string;

  @Validate(ValidateDaysOfWeek)
  @IsArray()
  @IsNotEmpty({ message: 'Dias de trabalho é obrigatório' })
  @ArrayMinSize(1)
  daysOfWork: Array<string>;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
