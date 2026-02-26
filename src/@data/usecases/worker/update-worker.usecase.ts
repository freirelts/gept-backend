import {
  UpdateWorker,
  UpdateWorkerParams,
} from '@domain/usecases/worker/updateWorker';
import { UpdateWorkerRepository } from '@domain/repositories/worker/updateWorkerRepository';
import { FindByIdWorkerRepository } from '@domain/repositories/worker/findByIdWorkerRepository';
import { EncryptPassword } from '@domain/usecases/security/encryptPassword';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { NotFoundException } from '@nestjs/common';

export class UpdateWorkerUseCase implements UpdateWorker {
  constructor(
    private readonly updateWorkerRepository: UpdateWorkerRepository,
    private readonly findByIdWorkerRepository: FindByIdWorkerRepository,
    private readonly findByIdsProject: FindByIdsProjectRepository,
    private readonly encryptPassword: EncryptPassword,
  ) {}

  async execute(data: UpdateWorkerParams): Promise<void> {
    const worker = await this.findByIdWorkerRepository.findById({
      id: data.id,
    });

    if (!worker) throw new NotFoundException('Trabalhador não encontrado.');

    const { projects } = await this.findByIdsProject.findByIds({
      ids: data.newData.projects,
    });

    if (projects.length > 0) {
      data.newData.projects.forEach((projectId) => {
        const projectFound = projects.find(
          (project) => project.id === projectId,
        );

        if (!projectFound)
          throw new NotFoundException(
            `Projeto com id ${projectId} não encontrado.`,
          );
      });
    }

    const newWorker = {
      ...worker,
      ...data.newData,
    };

    if (data.newData.password) {
      newWorker.password = await this.encryptPassword.encrypt(
        newWorker.password,
      );
    }

    return this.updateWorkerRepository.update({
      id: data.id,
      newData: {
        ...newWorker,
        projects: projects || [],
      },
    });
  }
}
