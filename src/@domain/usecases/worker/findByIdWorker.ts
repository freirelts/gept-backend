import { WorkerEntity } from '@domain/entities/worker.entity';

export interface FindByIdWorker {
  execute(params: FindByIdWorkerParams): Promise<FindByIdWorkerResult>;
}

export class FindByIdWorkerParams {
  id: string;
}

export class FindByIdWorkerResult extends WorkerEntity {}
