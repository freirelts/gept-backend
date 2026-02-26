export interface UpdateProjectRepository {
  update(params: UpdateProjectRepositoryParams): Promise<void>;
}

export class UpdateProjectRepositoryParams {
  id: string;
  newData: {
    name: string;
    description: string;
    active: boolean;
    daysOfWork: Array<string>;
  };
}
