import { FamilyEntity } from '@domain/entities/family.entity';

export interface FindByIdFamily {
  execute(params: FindByIdFamilyParams): Promise<FindByIdFamilyResult>;
}

export class FindByIdFamilyParams {
  id: string;
}

export class FindByIdFamilyResult extends FamilyEntity {}
