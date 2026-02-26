export interface Login {
  execute(params: LoginParams): Promise<LoginResult>;
}

export class LoginParams {
  email: string;
  password: string;
}

export class LoginResult {
  token: string;
}
