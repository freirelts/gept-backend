export interface UpdateWorker {
  execute(data: UpdateWorkerParams): Promise<void>;
}

export class UpdateWorkerParams {
  id: string;
  newData: {
    name?: string;
    email?: string;
    password?: string;
    accessLevel?: string;
    position?: string;
    phone?: string;
    isWhatsApp?: boolean;
    street?: string;
    number?: string;
    birthdate?: Date;
    neighborhood?: string;
    city?: string;
    complement?: string;
    postalCode?: string;
    active?: boolean;
    projects?: Array<string>;
  };
}
