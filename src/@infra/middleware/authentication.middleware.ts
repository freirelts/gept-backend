import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      const { authorization } = req.headers;

      const configService = new ConfigService();

      let token: string | undefined;

      const TOKEN_TYPE = 'Bearer';
      const JWT_SECRET = configService.get('JWT_SECRET');

      if (authorization) {
        const [tokenType, _token] = authorization.split(' ');
        if (tokenType !== TOKEN_TYPE) {
          throw new UnauthorizedException('Token inválido');
        }

        token = _token;
      }

      if (!token) {
        throw new UnauthorizedException('Token inválido');
      }

      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        name: string;
        email: string;
        accessLevel: string;
        position: string;
      };

      req.headers.workerId = decoded.id;
      req.headers.workerName = decoded.name;
      req.headers.workerEmail = decoded.email;
      req.headers.workerAccessLevel = decoded.accessLevel;
      req.headers.workerPosition = decoded.position;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException(this.getError(error));
      }

      throw new InternalServerErrorException(this.getError(error));
    }

    next();
  }

  getError(error: any): string {
    return error instanceof Error ? error.message : String(error);
  }
}
