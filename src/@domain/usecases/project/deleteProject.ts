export interface DeleteProject {
  execute(params: DeleteProjectParams): Promise<void>;
}

export class DeleteProjectParams {
  id: string;
}
