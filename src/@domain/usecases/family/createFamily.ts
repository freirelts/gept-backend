import { FamilyEntity } from '@domain/entities/family.entity';
import { PersonEntity } from '@domain/entities/person.entity';

export interface CreateFamily {
  execute(data: CreateFamilyParams): Promise<CreateFamilyResult>;
}

export class CreateFamilyParams {
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  isRented: boolean;
  rentPrice: number;
  projects: Array<string>;
  persons: Array<PersonEntity>;
}

export class CreateFamilyResult extends FamilyEntity {}
