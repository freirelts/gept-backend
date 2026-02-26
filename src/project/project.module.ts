import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { CreateProjectUseCase } from '@data/usecases/project/create-project.usecase';
import { UpdateProjectUseCase } from '@data/usecases/project/update-project.usecase';
import { FindAllProjectUseCase } from '@data/usecases/project/find-all-project.usecase';
import { FindByIdProjectUseCase } from '@data/usecases/project/find-by-id-project.usecase';
import { ProjectRepository } from '@infra/typeorm/repositories/project.repository';
import { CreateProjectRepository } from '@domain/repositories/project/createProjectRepository';
import { FindByIdProjectRepository } from '@domain/repositories/project/findByIdProjectRepository';
import { UpdateProjectRepository } from '@domain/repositories/project/updateProjectRepository';
import { FindAllProjectRepository } from '@domain/repositories/project/findAllProjectRepository';
import { DeleteProjectRepository } from '@domain/repositories/project/deleteProjectRepository';
import { DeleteProjectUseCase } from '@data/usecases/project/delete-project.usecase';

@Module({
  controllers: [ProjectController],
  providers: [
    {
      provide: CreateProjectUseCase,
      useFactory: (projectRepository: CreateProjectRepository) => {
        return new CreateProjectUseCase(projectRepository);
      },
      inject: [ProjectRepository],
    },
    {
      provide: UpdateProjectUseCase,
      useFactory: (
        updateProjectRepository: UpdateProjectRepository,
        findProjectRepository: FindByIdProjectRepository,
      ) => {
        return new UpdateProjectUseCase(
          updateProjectRepository,
          findProjectRepository,
        );
      },
      inject: [ProjectRepository, ProjectRepository],
    },
    {
      provide: FindAllProjectUseCase,
      useFactory: (projectRepository: FindAllProjectRepository) => {
        return new FindAllProjectUseCase(projectRepository);
      },
      inject: [ProjectRepository],
    },
    {
      provide: FindByIdProjectUseCase,
      useFactory: (projectRepository: FindByIdProjectRepository) => {
        return new FindByIdProjectUseCase(projectRepository);
      },
      inject: [ProjectRepository],
    },
    {
      provide: DeleteProjectUseCase,
      useFactory: (projectRepository: DeleteProjectRepository) => {
        return new DeleteProjectUseCase(projectRepository);
      },
      inject: [ProjectRepository],
    },
  ],
})
export class ProjectModule {}
