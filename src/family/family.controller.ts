import { CreateFamilyUseCase } from '@data/usecases/family/create-family.usecase';
import { DeleteFamilyUseCase } from '@data/usecases/family/delete-family.usecase copy';
import { FindAllFamilyUseCase } from '@data/usecases/family/find-all-family.usecase';
import { FindByIdFamilyUseCase } from '@data/usecases/family/find-by-id-family.usecase';
import { UpdateFamilyUseCase } from '@data/usecases/family/update-family.usecase';
import { CreateFamilyDto } from '@infra/dtos/family/create-family.dto';
import { UpdateFamilyDto } from '@infra/dtos/family/update-family.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';

@Controller('family')
export class FamilyController {
  // private readonly familyService: FamilyService
  constructor(
    private readonly createFamilyUserCase: CreateFamilyUseCase,
    private readonly findAllFamilyUseCase: FindAllFamilyUseCase,
    private readonly findByIdFamilyUseCase: FindByIdFamilyUseCase,
    private readonly updateFamilyUseCase: UpdateFamilyUseCase,
    private readonly deleteFamilyUseCase: DeleteFamilyUseCase,
  ) {}

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.createFamilyUserCase.execute(createFamilyDto);
  }

  @Get()
  findAll(@Headers('page') page: number, @Headers('perPage') perPage: number) {
    return this.findAllFamilyUseCase.execute({
      page: +page,
      perPage: +perPage,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdFamilyUseCase.execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.updateFamilyUseCase.execute({
      id,
      newData: updateFamilyDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteFamilyUseCase.execute({ id });
  }
}
