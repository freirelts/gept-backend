import {
  FindWorkerLoginRepository,
  FindWorkerLoginRepositoryParams,
  FindWorkerLoginRepositoryResult,
} from '@domain/repositories/authentication/findWorkerLoginRepository';
import {
  CountWorkerRepository,
  CountWorkerRepositoryResult,
} from '@domain/repositories/worker/countWorkerRepository';
import {
  CreateWorkerRepository,
  CreateWorkerRepositoryParams,
  CreateWorkerRepositoryResult,
} from '@domain/repositories/worker/createWorkerRepository';
import {
  DeleteWorkerRepository,
  DeleteWorkerRepositoryParams,
} from '@domain/repositories/worker/deleteWorkerRepository';
import {
  FindAllWorkerRepository,
  FindAllWorkerRepositoryParams,
  FindAllWorkerRepositoryResult,
} from '@domain/repositories/worker/findAllWorkerRepository';
import {
  FindByEmailWorkerRepository,
  FindByEmailWorkerRepositoryParams,
  FindByEmailWorkerRepositoryResult,
} from '@domain/repositories/worker/findByEmailWorkerRepository';
import {
  FindByIdWorkerRepository,
  FindByIdWorkerRepositoryParams,
  FindByIdWorkerRepositoryResult,
} from '@domain/repositories/worker/findByIdWorkerRepository';
import {
  UpdateWorkerRepository,
  UpdateWorkerRepositoryParams,
} from '@domain/repositories/worker/updateWorkerRepository';
import { WorkerSchema } from '@infra/typeorm/schemas/worker.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  projectEntityToSchema,
  projectSchemaToEntity,
} from './converters/project.converter';

export class WorkerRepository
  implements
    FindWorkerLoginRepository,
    CreateWorkerRepository,
    FindByEmailWorkerRepository,
    FindByEmailWorkerRepository,
    FindAllWorkerRepository,
    FindByIdWorkerRepository,
    UpdateWorkerRepository,
    DeleteWorkerRepository,
    CountWorkerRepository
{
  constructor(
    @InjectRepository(WorkerSchema)
    private workerRepository: Repository<WorkerSchema>,
  ) {}

  async create(
    params: CreateWorkerRepositoryParams,
  ): Promise<CreateWorkerRepositoryResult> {
    const worker = await this.workerRepository.save({
      ...params,
      projects: params.projects.map((project) =>
        projectEntityToSchema(project),
      ),
    });

    return {
      ...worker,
      projects: worker.projects.map((project) =>
        projectSchemaToEntity(project),
      ),
    };
  }

  async findWorkerLogin(
    params: FindWorkerLoginRepositoryParams,
  ): Promise<FindWorkerLoginRepositoryResult> {
    return await this.workerRepository.findOne({
      select: [
        'id',
        'name',
        'email',
        'password',
        'accessLevel',
        'position',
        'phone',
      ],
      where: {
        email: params.email,
      },
    });
  }

  async findByEmail(
    params: FindByEmailWorkerRepositoryParams,
  ): Promise<FindByEmailWorkerRepositoryResult> {
    const worker = await this.workerRepository.findOneBy({
      email: params.email,
    });

    if (worker) {
      const projects = worker.projects?.map((project) => {
        return projectSchemaToEntity(project);
      });

      return {
        ...worker,
        projects: projects,
      };
    }

    return null;
  }

  async findAll(
    params: FindAllWorkerRepositoryParams,
  ): Promise<FindAllWorkerRepositoryResult> {
    const { page = 1, perPage = 10 } = params;

    const [data, total] = await this.workerRepository.findAndCount({
      relations: {
        projects: true,
      },
      take: perPage,
      skip: perPage * page - perPage,
    });

    const workers = data.map((worker) => {
      return {
        ...worker,
        projects: worker.projects.map((project) => {
          return projectSchemaToEntity(project);
        }),
      };
    });

    return { workers, total };
  }

  async findById(
    params: FindByIdWorkerRepositoryParams,
  ): Promise<FindByIdWorkerRepositoryResult> {
    const worker = await this.workerRepository.findOne({
      where: {
        id: params.id,
      },
      relations: {
        projects: true,
      },
    });

    if (worker) {
      const projects = worker.projects?.map((project) => {
        return projectSchemaToEntity(project);
      });

      return {
        ...worker,
        projects: projects,
      };
    }

    return null;
  }

  async update(data: UpdateWorkerRepositoryParams): Promise<void> {
    const worker = await this.workerRepository.findOne({
      where: { id: data.id },
      relations: { projects: true },
    });

    const workerUpdated = {
      ...worker,
      ...data.newData,
      projects: data.newData.projects.map((project) => {
        return projectEntityToSchema(project);
      }),
    };

    await this.workerRepository.save(workerUpdated);
  }

  async delete(id: DeleteWorkerRepositoryParams): Promise<void> {
    await this.workerRepository.delete(id);
  }

  async count(): Promise<CountWorkerRepositoryResult> {
    const count = await this.workerRepository.count();

    return { count };
  }
}
