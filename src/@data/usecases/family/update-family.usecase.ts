import {
  UpdateFamily,
  UpdateFamilyParams,
} from '@domain/usecases/family/updateFamily';
import { UpdateFamilyRepository } from '@domain/repositories/family/updateFamilyRepository';
import { FindByIdFamilyRepository } from '@domain/repositories/family/findByIdFamilyRepository';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { NotFoundException } from '@nestjs/common';

export class UpdateFamilyUseCase implements UpdateFamily {
  constructor(
    private readonly updateFamilyRepository: UpdateFamilyRepository,
    private readonly findByIdFamilyRepository: FindByIdFamilyRepository,
    private readonly findByIdsProject: FindByIdsProjectRepository,
  ) {}

  async execute(params: UpdateFamilyParams): Promise<void> {
    const family = await this.findByIdFamilyRepository.findById({
      id: params.id,
    });

    if (!family) throw new NotFoundException('Família não encontrada.');

    const { projects } = await this.findByIdsProject.findByIds({
      ids: params.newData.projects,
    });

    if (projects.length > 0) {
      params.newData.projects.forEach((projectId) => {
        const projectFound = projects.find(
          (project) => project.id === projectId,
        );

        if (!projectFound)
          throw new NotFoundException(
            `Projeto com id ${projectId} não encontrado.`,
          );
      });
    }

    const newFamily = {
      ...family,
      ...params.newData,
    };

    return this.updateFamilyRepository.update({
      id: params.id,
      newData: {
        ...newFamily,
        projects: projects || [],
      },
    });
  }
}
