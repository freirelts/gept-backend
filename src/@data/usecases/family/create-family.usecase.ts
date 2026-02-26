import {
  CreateFamily,
  CreateFamilyParams,
  CreateFamilyResult,
} from '@domain/usecases/family/createFamily';
import { CreateFamilyRepository } from '@domain/repositories/family/createFamilyRepository';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { NotFoundException } from '@nestjs/common';
export class CreateFamilyUseCase implements CreateFamily {
  constructor(
    private readonly createFamilyRepository: CreateFamilyRepository,
    private readonly findByIdsProject: FindByIdsProjectRepository,
  ) {}

  async execute(params: CreateFamilyParams): Promise<CreateFamilyResult> {
    const { projects } = await this.findByIdsProject.findByIds({
      ids: params.projects,
    });

    params.projects.forEach((projectId) => {
      const projectFound = projects.find((project) => project.id === projectId);

      if (!projectFound)
        throw new NotFoundException(
          `Projeto com id ${projectId} não encontrado.`,
        );
    });

    return this.createFamilyRepository.create({
      ...params,
      projects: projects,
    });
  }
}
