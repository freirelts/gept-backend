import {
  FindAllWorker,
  FindAllWorkerParams,
  FindAllWorkerResult,
} from '@domain/usecases/worker/findAllWorker';
import { FindAllWorkerRepository } from '@domain/repositories/worker/findAllWorkerRepository';

export class FindAllWorkerUseCase implements FindAllWorker {
  constructor(
    private readonly findAllWorkerRepository: FindAllWorkerRepository,
  ) {}

  async execute(params: FindAllWorkerParams): Promise<FindAllWorkerResult> {
    return this.findAllWorkerRepository.findAll(params);
  }
}
