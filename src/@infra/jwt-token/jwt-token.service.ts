import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import {
  CreateToken,
  CreateTokenParams,
  CreateTokenResult,
} from '@domain/usecases/security/createToken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements CreateToken {
  constructor(private readonly configService: ConfigService) {}

  async create(params: CreateTokenParams): Promise<CreateTokenResult> {
    const JWT_SECRET = this.configService.get('JWT_SECRET');
    const token = jwt.sign(params, JWT_SECRET, {
      expiresIn: 84600,
    });
    return { token };
  }
}
