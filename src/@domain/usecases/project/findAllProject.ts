import { ProjectEntity } from '@domain/entities/project.entity';

export interface FindAllProject {
  execute(params: FindAllProjectParams): Promise<FindAllProjectResult>;
}

export class FindAllProjectParams {
  page: number;
  perPage: number;
}
export class FindAllProjectResult {
  projects: Array<ProjectEntity>;
  total: number;
}
