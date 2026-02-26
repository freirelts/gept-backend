import {
  FindByIdWorker,
  FindByIdWorkerParams,
  FindByIdWorkerResult,
} from '@domain/usecases/worker/findByIdWorker';
import { FindByIdWorkerRepository } from '@domain/repositories/worker/findByIdWorkerRepository';

export class FindByIdWorkerUseCase implements FindByIdWorker {
  constructor(
    private readonly findByIdWorkerRepository: FindByIdWorkerRepository,
  ) {}

  async execute(params: FindByIdWorkerParams): Promise<FindByIdWorkerResult> {
    return this.findByIdWorkerRepository.findById({ id: params.id });
  }
}
