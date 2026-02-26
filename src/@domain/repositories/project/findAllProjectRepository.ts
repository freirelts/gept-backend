import { ProjectEntity } from '@domain/entities/project.entity';

export interface FindAllProjectRepository {
  findAll(
    params: FindAllProjectRepositoryParams,
  ): Promise<FindAllProjectRepositoryResult>;
}

export class FindAllProjectRepositoryParams {
  page: number;
  perPage: number;
}

export class FindAllProjectRepositoryResult {
  projects: Array<ProjectEntity>;
  total: number;
}
