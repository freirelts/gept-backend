export interface ValidatePassword {
  validate(data: ValidatePasswordParams): Promise<ValidatePasswordResult>;
}

export class ValidatePasswordParams {
  password: string;
  hash: string;
}
export class ValidatePasswordResult {
  isValid: boolean;
}
