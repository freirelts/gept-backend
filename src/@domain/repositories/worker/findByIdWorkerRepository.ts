import { WorkerEntity } from '@domain/entities/worker.entity';

export interface FindByIdWorkerRepository {
  findById(
    params: FindByIdWorkerRepositoryParams,
  ): Promise<FindByIdWorkerRepositoryResult>;
}

export class FindByIdWorkerRepositoryParams {
  id: string;
}
export class FindByIdWorkerRepositoryResult extends WorkerEntity {}
