import {
  FindByIdFamily,
  FindByIdFamilyParams,
  FindByIdFamilyResult,
} from '@domain/usecases/family/findByIdFamily';
import { FindByIdFamilyRepository } from '@domain/repositories/family/findByIdFamilyRepository';

export class FindByIdFamilyUseCase implements FindByIdFamily {
  constructor(
    private readonly findByIdFamilyRepository: FindByIdFamilyRepository,
  ) {}

  async execute(params: FindByIdFamilyParams): Promise<FindByIdFamilyResult> {
    return this.findByIdFamilyRepository.findById({ id: params.id });
  }
}
