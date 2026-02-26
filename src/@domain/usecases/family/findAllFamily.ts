import { FamilyEntity } from '@domain/entities/family.entity';

export interface FindAllFamily {
  execute(params: FindAllFamilyParams): Promise<FindAllFamilyResult>;
}

export class FindAllFamilyParams {
  page: number;
  perPage: number;
}
export class FindAllFamilyResult {
  families: Array<FamilyEntity>;
  total: number;
}
