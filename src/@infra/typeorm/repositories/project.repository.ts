import {
  CountProjectRepository,
  CountProjectRepositoryResult,
} from '@domain/repositories/project/countProjectRepository';
import {
  CreateProjectRepository,
  CreateProjectRepositoryParams,
  CreateProjectRepositoryResult,
} from '@domain/repositories/project/createProjectRepository';
import {
  DeleteProjectRepository,
  DeleteProjectRepositoryParams,
} from '@domain/repositories/project/deleteProjectRepository';
import {
  FindAllProjectRepository,
  FindAllProjectRepositoryParams,
  FindAllProjectRepositoryResult,
} from '@domain/repositories/project/findAllProjectRepository';
import {
  FindByIdProjectRepository,
  FindByIdProjectRepositoryParams,
  FindByIdProjectRepositoryResult,
} from '@domain/repositories/project/findByIdProjectRepository';
import {
  FindByIdsProjectRepository,
  FindByIdsProjectRepositoryParams,
  FindByIdsProjectRepositoryResult,
} from '@domain/repositories/project/findByIdsProjectRepository';
import {
  UpdateProjectRepository,
  UpdateProjectRepositoryParams,
} from '@domain/repositories/project/updateProjectRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectSchema } from '../schemas/project.schema';

export class ProjectRepository
  implements
    CreateProjectRepository,
    FindAllProjectRepository,
    FindByIdProjectRepository,
    FindByIdsProjectRepository,
    UpdateProjectRepository,
    CountProjectRepository,
    DeleteProjectRepository
{
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>,
  ) {}

  async create(
    params: CreateProjectRepositoryParams,
  ): Promise<CreateProjectRepositoryResult> {
    const project = await this.projectRepository.save({
      ...params,
      daysOfWork: JSON.stringify(params.daysOfWork),
    });

    return {
      ...project,
      daysOfWork: JSON.parse(project.daysOfWork),
    };
  }

  async findAll(
    params: FindAllProjectRepositoryParams,
  ): Promise<FindAllProjectRepositoryResult> {
    const { page = 1, perPage = 10 } = params;

    const [data, total] = await this.projectRepository.findAndCount({
      take: perPage,
      skip: perPage * page - perPage,
    });

    const projects = data.map((project) => {
      return {
        ...project,
        daysOfWork: JSON.parse(project.daysOfWork) as Array<string>,
      };
    });

    return { projects, total };
  }

  async findById(
    params: FindByIdProjectRepositoryParams,
  ): Promise<FindByIdProjectRepositoryResult> {
    const project = await this.projectRepository.findOneBy({ id: params.id });

    if (project) {
      return {
        ...project,
        daysOfWork: JSON.parse(project.daysOfWork) as Array<string>,
      };
    } else {
      return null;
    }
  }

  async findByIds(
    params: FindByIdsProjectRepositoryParams,
  ): Promise<FindByIdsProjectRepositoryResult> {
    if (params && Array.isArray(params.ids)) {
      const data = await this.projectRepository.findBy({ id: In(params.ids) });

      const projects = data?.map((project) => {
        return {
          ...project,
          daysOfWork: JSON.parse(project.daysOfWork),
        };
      });

      return { projects };
    }

    return { projects: [] };
  }

  async update(data: UpdateProjectRepositoryParams): Promise<void> {
    await this.projectRepository.update(data.id, {
      ...data.newData,
      daysOfWork: JSON.stringify(data.newData.daysOfWork),
    });
  }

  async delete(id: DeleteProjectRepositoryParams): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async count(): Promise<CountProjectRepositoryResult> {
    const count = await this.projectRepository.count();

    return { count };
  }
}
