import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '@data/usecases/authentication/login.usecase';
import { LoginDto } from '@infra/dtos/authentication/login.dto';

@Controller('login')
export class AuthenticationController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
