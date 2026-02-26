import { DeleteWorkerRepository } from '@domain/repositories/worker/deleteWorkerRepository';
import {
  DeleteWorker,
  DeleteWorkerParams,
} from '@domain/usecases/worker/deleteWorker';

export class DeleteWorkerUseCase implements DeleteWorker {
  constructor(
    private readonly deleteWorkerRepository: DeleteWorkerRepository,
  ) {}

  async execute(params: DeleteWorkerParams): Promise<void> {
    return await this.deleteWorkerRepository.delete({
      id: params.id,
    });
  }
}
