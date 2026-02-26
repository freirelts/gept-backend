import { ProjectEntity } from '@domain/entities/project.entity';

export interface FindByIdsProjectRepository {
  findByIds(
    params: FindByIdsProjectRepositoryParams,
  ): Promise<FindByIdsProjectRepositoryResult>;
}

export class FindByIdsProjectRepositoryParams {
  ids: Array<string>;
}

export class FindByIdsProjectRepositoryResult {
  projects: Array<ProjectEntity>;
}
