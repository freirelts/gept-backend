import { DeleteProjectRepository } from '@domain/repositories/project/deleteProjectRepository';
import {
  DeleteProject,
  DeleteProjectParams,
} from '@domain/usecases/project/deleteProject';

export class DeleteProjectUseCase implements DeleteProject {
  constructor(
    private readonly deleteProjectRepository: DeleteProjectRepository,
  ) {}

  async execute(params: DeleteProjectParams): Promise<void> {
    return await this.deleteProjectRepository.delete({
      id: params.id,
    });
  }
}
