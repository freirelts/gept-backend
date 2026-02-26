import { ProjectEntity } from './project.entity';

export class WorkerEntity {
  id?: string;
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
