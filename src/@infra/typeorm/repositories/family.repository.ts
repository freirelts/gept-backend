import {
  CountFamilyRepository,
  CountFamilyRepositoryResult,
} from '@domain/repositories/family/countFamilyRepository';
import {
  CreateFamilyRepository,
  CreateFamilyRepositoryParams,
  CreateFamilyRepositoryResult,
} from '@domain/repositories/family/createFamilyRepository';
import {
  DeleteFamilyRepository,
  DeleteFamilyRepositoryParams,
} from '@domain/repositories/family/deleteFamilyRepository';
import {
  FindAllFamilyRepository,
  FindAllFamilyRepositoryParams,
  FindAllFamilyRepositoryResult,
} from '@domain/repositories/family/findAllFamilyRepository';
import {
  FindByIdFamilyRepository,
  FindByIdFamilyRepositoryParams,
  FindByIdFamilyRepositoryResult,
} from '@domain/repositories/family/findByIdFamilyRepository';
import {
  UpdateFamilyRepository,
  UpdateFamilyRepositoryParams,
} from '@domain/repositories/family/updateFamilyRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilySchema } from '../schemas/family.schema';
import {
  personEntityToSchema,
  personSchemaToEntity,
} from './converters/person.converter';
import {
  projectEntityToSchema,
  projectSchemaToEntity,
} from './converters/project.converter';

export class FamilyRepository
  implements
    CreateFamilyRepository,
    FindAllFamilyRepository,
    FindByIdFamilyRepository,
    UpdateFamilyRepository,
    DeleteFamilyRepository,
    CountFamilyRepository
{
  constructor(
    @InjectRepository(FamilySchema)
    private readonly familyRepository: Repository<FamilySchema>,
  ) {}

  async create(
    params: CreateFamilyRepositoryParams,
  ): Promise<CreateFamilyRepositoryResult> {
    const projects = params.projects.map((project) => {
      return projectEntityToSchema(project);
    });

    const persons = params.persons.map((project) => {
      return personEntityToSchema(project);
    });

    const family = await this.familyRepository.save({
      ...params,
      projects,
      persons,
    });

    return {
      ...family,
      projects: family.projects.map((project) => {
        return projectSchemaToEntity(project);
      }),
      persons: family.persons.map((person) => {
        return personSchemaToEntity(person);
      }),
    };
  }

  async findAll(
    params: FindAllFamilyRepositoryParams,
  ): Promise<FindAllFamilyRepositoryResult> {
    const { page = 1, perPage = 10 } = params;

    const [data, total] = await this.familyRepository.findAndCount({
      relations: {
        projects: true,
        persons: true,
      },
      take: perPage,
      skip: perPage * page - perPage,
    });

    const families = data.map((family) => {
      return {
        ...family,
        projects: family.projects.map((project) => {
          return projectSchemaToEntity(project);
        }),
        persons: family.persons.map((person) => {
          return personSchemaToEntity(person);
        }),
      };
    });

    return { families, total };
  }

  async findById(
    params: FindByIdFamilyRepositoryParams,
  ): Promise<FindByIdFamilyRepositoryResult> {
    const family = await this.familyRepository.findOne({
      where: {
        id: params.id,
      },
      relations: {
        projects: true,
        persons: true,
      },
    });

    if (family) {
      return {
        ...family,
        projects: family.projects.map((project) => {
          return projectSchemaToEntity(project);
        }),
        persons: family.persons.map((person) => {
          return personSchemaToEntity(person);
        }),
      };
    } else {
      return null;
    }
  }

  async update(data: UpdateFamilyRepositoryParams): Promise<void> {
    const family = await this.familyRepository.findOne({
      where: { id: data.id },
      relations: { projects: true, persons: true },
    });

    const familyUpdated = {
      ...family,
      ...data.newData,
      projects: data.newData.projects.map((project) => {
        return projectEntityToSchema(project);
      }),
      persons: data.newData.persons.map((person) => {
        return personEntityToSchema(person);
      }),
    };

    await this.familyRepository.save(familyUpdated);
  }

  async delete(params: DeleteFamilyRepositoryParams): Promise<void> {
    await this.familyRepository.delete({ id: params.id });
  }

  async count(): Promise<CountFamilyRepositoryResult> {
    const count = await this.familyRepository.count();

    return { count };
  }
}
