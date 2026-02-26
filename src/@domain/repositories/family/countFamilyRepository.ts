export interface CountFamilyRepository {
  count(): Promise<CountFamilyRepositoryResult>;
}

export class CountFamilyRepositoryResult {
  count: number;
}
