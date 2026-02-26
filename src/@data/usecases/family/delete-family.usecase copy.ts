import {
  DeleteFamily,
  DeleteFamilyParams,
} from '@domain/usecases/family/deleteFamily';
import { DeleteFamilyRepository } from '@domain/repositories/family/deleteFamilyRepository';

export class DeleteFamilyUseCase implements DeleteFamily {
  constructor(
    private readonly deleteFamilyRepository: DeleteFamilyRepository,
  ) {}

  async execute(params: DeleteFamilyParams): Promise<void> {
    return this.deleteFamilyRepository.delete({
      id: params.id,
    });
  }
}
