import { ProjectEntity } from '@domain/entities/project.entity';
import { ProjectSchema } from '@infra/typeorm/schemas/project.schema';

export function projectEntityToSchema(project: ProjectEntity): ProjectSchema {
  return new ProjectSchema(
    project.id,
    project.name,
    project.description,
    project.active,
    JSON.stringify(project.daysOfWork),
  );
}

export function projectSchemaToEntity(project: ProjectSchema): ProjectEntity {
  return new ProjectEntity(
    project.id,
    project.name,
    project.description,
    project.active,
    JSON.parse(project.daysOfWork),
  );
}
