import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

//middleware
import { AuthenticationMiddleware } from '@infra/middleware/authentication.middleware';

//infra modules
import { InfraModule } from '@infra/infra.module';

//api modules
import { AuthenticationModule } from './authentication/authentication.module';
import { WorkerModule } from './worker/worker.module';
import { ProjectModule } from './project/project.module';
import { FamilyModule } from './family/family.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InfraModule,
    AuthenticationModule,
    WorkerModule,
    ProjectModule,
    FamilyModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude({ path: 'login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
