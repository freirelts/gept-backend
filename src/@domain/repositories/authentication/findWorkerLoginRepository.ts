export interface FindWorkerLoginRepository {
  findWorkerLogin(
    data: FindWorkerLoginRepositoryParams,
  ): Promise<FindWorkerLoginRepositoryResult>;
}

export class FindWorkerLoginRepositoryParams {
  email: string;
}

export class FindWorkerLoginRepositoryResult {
  id: string;
  name: string;
  email: string;
  password: string;
  accessLevel: string;
  position: string;
  phone: string;
}
