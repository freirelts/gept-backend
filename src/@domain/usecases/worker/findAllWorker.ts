import { WorkerEntity } from '@domain/entities/worker.entity';

export interface FindAllWorker {
  execute(params: FindAllWorkerParams): Promise<FindAllWorkerResult>;
}

export class FindAllWorkerParams {
  page: number;
  perPage: number;
}
export class FindAllWorkerResult {
  workers: Array<WorkerEntity>;
  total: number;
}
