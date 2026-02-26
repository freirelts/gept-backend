export interface DeleteProjectRepository {
  delete(params: DeleteProjectRepositoryParams): Promise<void>;
}

export class DeleteProjectRepositoryParams {
  id: string;
}
