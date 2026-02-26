import { CreateFamilyUseCase } from '@data/usecases/family/create-family.usecase';
import { DeleteFamilyUseCase } from '@data/usecases/family/delete-family.usecase copy';
import { FindAllFamilyUseCase } from '@data/usecases/family/find-all-family.usecase';
import { FindByIdFamilyUseCase } from '@data/usecases/family/find-by-id-family.usecase';
import { UpdateFamilyUseCase } from '@data/usecases/family/update-family.usecase';
import { CreateFamilyRepository } from '@domain/repositories/family/createFamilyRepository';
import { DeleteFamilyRepository } from '@domain/repositories/family/deleteFamilyRepository';
import { FindAllFamilyRepository } from '@domain/repositories/family/findAllFamilyRepository';
import { FindByIdFamilyRepository } from '@domain/repositories/family/findByIdFamilyRepository';
import { UpdateFamilyRepository } from '@domain/repositories/family/updateFamilyRepository';
import { FindByIdsProjectRepository } from '@domain/repositories/project/findByIdsProjectRepository';
import { FamilyRepository } from '@infra/typeorm/repositories/family.repository';
import { ProjectRepository } from '@infra/typeorm/repositories/project.repository';
import { Module } from '@nestjs/common';
import { FamilyController } from './family.controller';

@Module({
  controllers: [FamilyController],
  providers: [
    {
      provide: CreateFamilyUseCase,
      useFactory: (
        createFamilyRepository: CreateFamilyRepository,
        findByIdsProject: FindByIdsProjectRepository,
      ) => {
        return new CreateFamilyUseCase(
          createFamilyRepository,
          findByIdsProject,
        );
      },
      inject: [FamilyRepository, ProjectRepository],
    },

    {
      provide: FindAllFamilyUseCase,
      useFactory: (findAllFamilyRepository: FindAllFamilyRepository) => {
        return new FindAllFamilyUseCase(findAllFamilyRepository);
      },
      inject: [FamilyRepository],
    },

    {
      provide: FindByIdFamilyUseCase,
      useFactory: (findByIdFamilyRepository: FindByIdFamilyRepository) => {
        return new FindByIdFamilyUseCase(findByIdFamilyRepository);
      },
      inject: [FamilyRepository],
    },

    {
      provide: UpdateFamilyUseCase,
      useFactory: (
        updateFamilyRepository: UpdateFamilyRepository,
        findByIdFamilyRepository: FindByIdFamilyRepository,
        findByIdsProject: FindByIdsProjectRepository,
      ) => {
        return new UpdateFamilyUseCase(
          updateFamilyRepository,
          findByIdFamilyRepository,
          findByIdsProject,
        );
      },
      inject: [FamilyRepository, FamilyRepository, ProjectRepository],
    },

    {
      provide: DeleteFamilyUseCase,
      useFactory: (deleteFamilyRepository: DeleteFamilyRepository) => {
        return new DeleteFamilyUseCase(deleteFamilyRepository);
      },
      inject: [FamilyRepository],
    },
  ],
})
export class FamilyModule {}
