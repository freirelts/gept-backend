import { FamilyEntity } from '@domain/entities/family.entity';

export interface FindAllFamilyRepository {
  findAll(
    params: FindAllFamilyRepositoryParams,
  ): Promise<FindAllFamilyRepositoryResult>;
}

export class FindAllFamilyRepositoryParams {
  page: number;
  perPage: number;
}

export class FindAllFamilyRepositoryResult {
  families: Array<FamilyEntity>;
  total: number;
}
