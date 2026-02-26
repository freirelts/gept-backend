export interface UpdateProject {
  execute(data: UpdateProjectParams): Promise<void>;
}

export class UpdateProjectParams {
  id: string;
  newData: {
    name?: string;
    active?: boolean;
    description?: string;
    daysOfWork?: Array<string>;
  };
}
