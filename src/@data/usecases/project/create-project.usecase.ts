import {
  CreateProject,
  CreateProjectParams,
  CreateProjectResult,
} from '@domain/usecases/project/createProject';
import { CreateProjectRepository } from '@domain/repositories/project/createProjectRepository';

export class CreateProjectUseCase implements CreateProject {
  constructor(
    private readonly createProjectRepository: CreateProjectRepository,
  ) {}

  async execute(data: CreateProjectParams): Promise<CreateProjectResult> {
    return this.createProjectRepository.create({
      ...data,
      active: true,
    });
  }
}
