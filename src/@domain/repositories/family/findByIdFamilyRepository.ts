import { FamilyEntity } from '@domain/entities/family.entity';

export interface FindByIdFamilyRepository {
  findById(
    params: FindByIdFamilyRepositoryParams,
  ): Promise<FindByIdFamilyRepositoryResult>;
}

export class FindByIdFamilyRepositoryParams {
  id: string;
}

export class FindByIdFamilyRepositoryResult extends FamilyEntity {}
