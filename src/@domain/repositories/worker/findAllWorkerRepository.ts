import { WorkerEntity } from '@domain/entities/worker.entity';

export interface FindAllWorkerRepository {
  findAll(
    params: FindAllWorkerRepositoryParams,
  ): Promise<FindAllWorkerRepositoryResult>;
}

export class FindAllWorkerRepositoryParams {
  page: number;
  perPage: number;
}

export class FindAllWorkerRepositoryResult {
  workers: Array<WorkerEntity>;
  total: number;
}
