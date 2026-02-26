import { Module } from '@nestjs/common';
import { LoginUseCase } from '@data/usecases/authentication/login.usecase';
import { AuthenticationController } from './authentication.controller';
import { WorkerRepository } from '@infra/typeorm/repositories/worker.repository';
import { FindWorkerLoginRepository } from '@domain/repositories/authentication/findWorkerLoginRepository';
import { ValidatePassword } from '@domain/usecases/security/validatePassword';
import { BcryptService } from '@infra/bcrypt/bcrypt.service';
import { JwtTokenService } from '@infra/jwt-token/jwt-token.service';
import { CreateToken } from '@domain/usecases/security/createToken';

@Module({
  controllers: [AuthenticationController],
  providers: [
    {
      provide: LoginUseCase,
      useFactory: (
        workerRepository: FindWorkerLoginRepository,
        validatePassword: ValidatePassword,
        createToken: CreateToken,
      ) => {
        return new LoginUseCase(
          workerRepository,
          validatePassword,
          createToken,
        );
      },
      inject: [WorkerRepository, BcryptService, JwtTokenService],
    },
  ],
})
export class AuthenticationModule {}
