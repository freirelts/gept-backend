import { EncryptPassword } from '@domain/usecases/security/encryptPassword';
import {
  ValidatePassword,
  ValidatePasswordParams,
  ValidatePasswordResult,
} from '@domain/usecases/security/validatePassword';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements ValidatePassword, EncryptPassword {
  private readonly saltRounds = 10;

  async validate(
    params: ValidatePasswordParams,
  ): Promise<ValidatePasswordResult> {
    const isValid = await bcrypt.compare(params.password, params.hash);

    return { isValid };
  }

  encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
