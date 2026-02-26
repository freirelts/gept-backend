import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): any {
    return {
      status: 'Ok!',
      version: this.configService.get('API_VERSION') || '2.0.0',
    };
  }
}
