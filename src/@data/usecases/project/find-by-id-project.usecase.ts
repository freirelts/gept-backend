import {
  FindByIdProject,
  FindByIdProjectParams,
  FindByIdProjectResult,
} from '@domain/usecases/project/findByIdProject';
import { FindByIdProjectRepository } from '@domain/repositories/project/findByIdProjectRepository';

export class FindByIdProjectUseCase implements FindByIdProject {
  constructor(
    private readonly findByIdProjectRepository: FindByIdProjectRepository,
  ) {}

  async execute(params: FindByIdProjectParams): Promise<FindByIdProjectResult> {
    return this.findByIdProjectRepository.findById({ id: params.id });
  }
}
