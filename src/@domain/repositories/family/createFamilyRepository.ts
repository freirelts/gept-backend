import { FamilyEntity } from '@domain/entities/family.entity';
import { PersonEntity } from '@domain/entities/person.entity';
import { ProjectEntity } from '@domain/entities/project.entity';

export interface CreateFamilyRepository {
  create(
    params: CreateFamilyRepositoryParams,
  ): Promise<CreateFamilyRepositoryResult>;
}

export class CreateFamilyRepositoryParams {
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  isRented: boolean;
  rentPrice: number;
  projects: Array<ProjectEntity>;
  persons: Array<PersonEntity>;
}

export class CreateFamilyRepositoryResult extends FamilyEntity {}
