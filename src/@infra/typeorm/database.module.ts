import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './database.source';
import { FamilyRepository } from './repositories/family.repository';
import { ProjectRepository } from './repositories/project.repository';
import { WorkerRepository } from './repositories/worker.repository';
import { FamilySchema } from './schemas/family.schema';
import { ProjectSchema } from './schemas/project.schema';
import { WorkerSchema } from './schemas/worker.schema';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([WorkerSchema]),
    TypeOrmModule.forFeature([FamilySchema]),
    TypeOrmModule.forFeature([ProjectSchema]),
  ],
  providers: [WorkerRepository, FamilyRepository, ProjectRepository],
  exports: [WorkerRepository, FamilyRepository, ProjectRepository],
})
export class DatabaseModule {}
