export interface CountWorkerRepository {
  count(): Promise<CountWorkerRepositoryResult>;
}

export class CountWorkerRepositoryResult {
  count: number;
}
