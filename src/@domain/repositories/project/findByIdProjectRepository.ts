import { ProjectEntity } from '@domain/entities/project.entity';

export interface FindByIdProjectRepository {
  findById(
    params: FindByIdProjectRepositoryParams,
  ): Promise<FindByIdProjectRepositoryResult>;
}

export class FindByIdProjectRepositoryParams {
  id: string;
}

export class FindByIdProjectRepositoryResult extends ProjectEntity {}
