export interface DeleteFamilyRepository {
  delete(params: DeleteFamilyRepositoryParams): Promise<void>;
}

export class DeleteFamilyRepositoryParams {
  id: string;
}
