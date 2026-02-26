export interface DeleteWorker {
  execute(params: DeleteWorkerParams): Promise<void>;
}

export class DeleteWorkerParams {
  id: string;
}
