import { ProjectEntity } from '@domain/entities/project.entity';

export interface CreateProject {
  execute(data: CreateProjectParams): Promise<CreateProjectResult>;
}

export class CreateProjectParams {
  name: string;
  description: string;
  daysOfWork: Array<string>;
  active: boolean;
}
export class CreateProjectResult extends ProjectEntity {}
