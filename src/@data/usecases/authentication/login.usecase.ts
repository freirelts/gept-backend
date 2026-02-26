import {
  Login,
  LoginParams,
  LoginResult,
} from '@domain/usecases/authentication/login';
import { FindWorkerLoginRepository } from '@domain/repositories/authentication/findWorkerLoginRepository';
import { ValidatePassword } from '@domain/usecases/security/validatePassword';
import { CreateToken } from '@domain/usecases/security/createToken';
import { BadRequestException } from '@nestjs/common';

export class LoginUseCase implements Login {
  constructor(
    private readonly findWorkerLoginRepository: FindWorkerLoginRepository,
    private readonly validatePassword: ValidatePassword,
    private readonly createToken: CreateToken,
  ) {}

  async execute(loginData: LoginParams): Promise<LoginResult> {
    const worker = await this.findWorkerLoginRepository.findWorkerLogin({
      email: loginData.email,
    });

    if (!worker) throw new BadRequestException('Email ou senha incorretos');

    const isValidPassword = await this.validatePassword.validate({
      password: loginData.password,
      hash: worker.password,
    });

    if (!isValidPassword)
      throw new BadRequestException('Email ou senha incorretos');

    const tokenData = {
      id: worker.id,
      name: worker.name,
      email: worker.email,
      accessLevel: worker.accessLevel,
      position: worker.position,
      phone: worker.phone,
    };

    const result = await this.createToken.create(tokenData);

    return { token: result.token };
  }
}
