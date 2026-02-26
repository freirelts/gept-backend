import { PersonEntity } from '@domain/entities/person.entity';
import { ProjectEntity } from '@domain/entities/project.entity';

export interface UpdateFamilyRepository {
  update(params: UpdateFamilyRepositoryParams): Promise<void>;
}

export class UpdateFamilyRepositoryParams {
  id: string;
  newData: {
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    isRented: boolean;
    rentPrice: number;
    projects: Array<ProjectEntity>;
    persons: Array<PersonEntity>;
  };
}
