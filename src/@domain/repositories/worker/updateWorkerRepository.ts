import { ProjectEntity } from '@domain/entities/project.entity';

export interface UpdateWorkerRepository {
  update(params: UpdateWorkerRepositoryParams): Promise<void>;
}

export class UpdateWorkerRepositoryParams {
  id: string;
  newData: {
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
  };
}
