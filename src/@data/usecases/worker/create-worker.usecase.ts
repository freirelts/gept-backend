import {
  CreateWorker,
  CreateWorkerParams,
  CreateWorkerResult,
} from '@domain/usecases/worker/createWorker';
import { CreateWorkerRepository } from '@domain/repositories/worker/createWorkerRepository';
import { FindByEmailWorkerRepository } from '@domain/repositories/worker/findByEmailWorkerRepository';
import { EncryptPassword } from '@domain/usecases/security/encryptPassword';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class CreateWorkerUseCase implements CreateWorker {
  constructor(
    private readonly findByEmailWorkerRepository: FindByEmailWorkerRepository,
    private readonly findByIdsProject: FindByIdsProjectRepository,
    private readonly encryptPassword: EncryptPassword,
    private readonly createWorkerRepository: CreateWorkerRepository,
  ) {}

  async execute(data: CreateWorkerParams): Promise<CreateWorkerResult> {
    const alreadyInUse = await this.findByEmailWorkerRepository.findByEmail({
      email: data.email,
    });

    if (alreadyInUse?.email === data.email)
      throw new BadRequestException('Email já está sendo utilizado.');

    const { projects } = await this.findByIdsProject.findByIds({
      ids: data.projects,
    });

    data.projects.forEach((projectId) => {
      const projectFound = projects.find((project) => project.id === projectId);

      if (!projectFound)
        throw new NotFoundException(
          `Projeto com id ${projectId} não encontrado.`,
        );
    });

    return this.createWorkerRepository.create({
      ...data,
      password: await this.encryptPassword.encrypt(data.password),
      projects: projects,
      active: true,
    });
  }
}
