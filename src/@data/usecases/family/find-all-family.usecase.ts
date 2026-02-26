import {
  FindAllFamily,
  FindAllFamilyParams,
  FindAllFamilyResult,
} from '@domain/usecases/family/findAllFamily';
import { FindAllFamilyRepository } from '@domain/repositories/family/findAllFamilyRepository';

export class FindAllFamilyUseCase implements FindAllFamily {
  constructor(
    private readonly findAllFamilyRepository: FindAllFamilyRepository,
  ) {}

  async execute(params: FindAllFamilyParams): Promise<FindAllFamilyResult> {
    return this.findAllFamilyRepository.findAll(params);
  }
}
