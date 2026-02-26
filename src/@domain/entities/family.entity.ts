import { PersonEntity } from './person.entity';
import { ProjectEntity } from './project.entity';

export class FamilyEntity {
  id?: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  isRented: boolean;
  rentPrice: number;
  projects: Array<ProjectEntity>;
  persons: Array<PersonEntity>;
}
