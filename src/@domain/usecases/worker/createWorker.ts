import { WorkerEntity } from '@domain/entities/worker.entity';

export interface CreateWorker {
  execute(data: CreateWorkerParams): Promise<CreateWorkerResult>;
}

export class CreateWorkerParams {
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
  projects: Array<string>;
}

export class CreateWorkerResult extends WorkerEntity {}
