import { FamilyRepository } from '@infra/typeorm/repositories/family.repository';
import { ProjectRepository } from '@infra/typeorm/repositories/project.repository';
import { WorkerRepository } from '@infra/typeorm/repositories/worker.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly workerRepository: WorkerRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async getCounters() {
    const [familiesCount, workersCount, projectsCount] = await Promise.all([
      this.familyRepository.count(),
      this.workerRepository.count(),
      this.projectRepository.count(),
    ]);

    return {
      families: familiesCount,
      workers: workersCount,
      projects: projectsCount,
    };
  }
}
