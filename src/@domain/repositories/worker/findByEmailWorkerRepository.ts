import { WorkerEntity } from '@domain/entities/worker.entity';

export interface FindByEmailWorkerRepository {
  findByEmail(
    params: FindByEmailWorkerRepositoryParams,
  ): Promise<FindByEmailWorkerRepositoryResult>;
}

export class FindByEmailWorkerRepositoryParams {
  email: string;
}

export class FindByEmailWorkerRepositoryResult extends WorkerEntity {}
