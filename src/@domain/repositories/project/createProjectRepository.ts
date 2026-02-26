import { ProjectEntity } from '@domain/entities/project.entity';

export interface CreateProjectRepository {
  create(
    params: CreateProjectRepositoryParams,
  ): Promise<CreateProjectRepositoryResult>;
}

export class CreateProjectRepositoryParams {
  name: string;
  description: string;
  active: boolean;
  daysOfWork: Array<string>;
}
export class CreateProjectRepositoryResult extends ProjectEntity {}
