import { Module } from '@nestjs/common';
import { FindByEmailWorkerRepository } from '@domain/repositories/worker/findByEmailWorkerRepository';
import { CreateWorkerUseCase } from '@data/usecases/worker/create-worker.usecase';
import { WorkerController } from './worker.controller';
import { WorkerRepository } from '@infra/typeorm/repositories/worker.repository';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { ProjectRepository } from '@infra/typeorm/repositories/project.repository';
import { EncryptPassword } from '@domain/usecases/security/encryptPassword';
import { CreateWorkerRepository } from '@domain/repositories/worker/createWorkerRepository';
import { BcryptService } from '@infra/bcrypt/bcrypt.service';
import { FindByIdWorkerUseCase } from '@data/usecases/worker/find-by-id-worker.usecase';
import { FindAllWorkerUseCase } from '@data/usecases/worker/find-all-worker.usecase';
import { UpdateWorkerUseCase } from '@data/usecases/worker/update-worker.usecase';
import { FindAllWorkerRepository } from '@domain/repositories/worker/findAllWorkerRepository';
import { FindByIdWorkerRepository } from '@domain/repositories/worker/findByIdWorkerRepository';
import { UpdateWorkerRepository } from '@domain/repositories/worker/updateWorkerRepository';
import { DeleteWorkerUseCase } from '@data/usecases/worker/delete-worker.usecase';
import { DeleteWorkerRepository } from '@domain/repositories/worker/deleteWorkerRepository';

@Module({
  controllers: [WorkerController],
  providers: [
    {
      provide: CreateWorkerUseCase,
      useFactory: (
        workerRepository: FindByEmailWorkerRepository,
        projectRepository: FindByIdsProjectRepository,
        encryptPassword: EncryptPassword,
        createWorkerRepository: CreateWorkerRepository,
      ) => {
        return new CreateWorkerUseCase(
          workerRepository,
          projectRepository,
          encryptPassword,
          createWorkerRepository,
        );
      },
      inject: [
        WorkerRepository,
        ProjectRepository,
        BcryptService,
        WorkerRepository,
      ],
    },
    {
      provide: FindAllWorkerUseCase,
      useFactory: (workerRepository: FindAllWorkerRepository) => {
        return new FindAllWorkerUseCase(workerRepository);
      },
      inject: [WorkerRepository],
    },
    {
      provide: FindByIdWorkerUseCase,
      useFactory: (workerRepository: FindByIdWorkerRepository) => {
        return new FindByIdWorkerUseCase(workerRepository);
      },
      inject: [WorkerRepository],
    },
    {
      provide: UpdateWorkerUseCase,
      useFactory: (
        updateWorkerRepository: UpdateWorkerRepository,
        findByIdWorkerRepository: FindByIdWorkerRepository,
        findByIdsProjectRepository: FindByIdsProjectRepository,
        encryptPassword: EncryptPassword,
      ) => {
        return new UpdateWorkerUseCase(
          updateWorkerRepository,
          findByIdWorkerRepository,
          findByIdsProjectRepository,
          encryptPassword,
        );
      },
      inject: [
        WorkerRepository,
        WorkerRepository,
        ProjectRepository,
        BcryptService,
      ],
    },
    {
      provide: DeleteWorkerUseCase,
      useFactory: (workerRepository: DeleteWorkerRepository) => {
        return new DeleteWorkerUseCase(workerRepository);
      },
      inject: [WorkerRepository],
    },
  ],
})
export class WorkerModule {}
