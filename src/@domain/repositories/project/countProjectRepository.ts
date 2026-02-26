export interface CountProjectRepository {
  count(): Promise<CountProjectRepositoryResult>;
}

export class CountProjectRepositoryResult {
  count: number;
}
