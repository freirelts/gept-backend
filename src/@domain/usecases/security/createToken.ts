export interface CreateToken {
  create(params: CreateTokenParams): Promise<CreateTokenResult>;
}

export class CreateTokenParams {
  id: string;
  email: string;
  name: string;
  accessLevel: string;
  position: string;
}

export class CreateTokenResult {
  token: string;
}
