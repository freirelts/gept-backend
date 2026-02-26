import { Module } from '@nestjs/common';
import { BcryptModule } from '@infra/bcrypt/bcrypt.module';
import { JwtTokenModule } from '@infra/jwt-token/jwt-token.module';
import { DatabaseModule } from './typeorm/database.module';

@Module({
  imports: [DatabaseModule, BcryptModule, JwtTokenModule],
})
export class InfraModule {}
