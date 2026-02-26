import { ProjectEntity } from '@domain/entities/project.entity';

export interface FindByIdProject {
  execute(params: FindByIdProjectParams): Promise<FindByIdProjectResult>;
}

export class FindByIdProjectParams {
  id: string;
}

export class FindByIdProjectResult extends ProjectEntity {}
