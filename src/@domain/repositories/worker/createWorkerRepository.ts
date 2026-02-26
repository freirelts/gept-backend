import { ProjectEntity } from '@domain/entities/project.entity';
import { WorkerEntity } from '@domain/entities/worker.entity';

export interface CreateWorkerRepository {
  create(
    params: CreateWorkerRepositoryParams,
  ): Promise<CreateWorkerRepositoryResult>;
}

export class CreateWorkerRepositoryParams {
  name: string;
  email: string;
  password: string;
  accessLevel: string;
  position: string;
  phone: string;
  isWhatsApp: boolean;
  street: string;
  number: string;
  birthdate: Date;
  neighborhood: string;
  city: string;
  complement: string;
  postalCode: string;
  active: boolean;
  projects: Array<ProjectEntity>;
}

export class CreateWorkerRepositoryResult extends WorkerEntity {}
