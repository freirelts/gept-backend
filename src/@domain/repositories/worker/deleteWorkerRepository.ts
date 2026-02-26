export interface DeleteWorkerRepository {
  delete(params: DeleteWorkerRepositoryParams): Promise<void>;
}

export class DeleteWorkerRepositoryParams {
  id: string;
}
