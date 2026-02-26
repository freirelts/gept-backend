import {
  FindAllProject,
  FindAllProjectParams,
  FindAllProjectResult,
} from '@domain/usecases/project/findAllProject';
import { FindAllProjectRepository } from '@domain/repositories/project/findAllProjectRepository';

export class FindAllProjectUseCase implements FindAllProject {
  constructor(
    private readonly findAllProjectRepository: FindAllProjectRepository,
  ) {}

  async execute(params: FindAllProjectParams): Promise<FindAllProjectResult> {
    return this.findAllProjectRepository.findAll(params);
  }
}
