import { CreateProjectUseCase } from '@data/usecases/project/create-project.usecase';
import { DeleteProjectUseCase } from '@data/usecases/project/delete-project.usecase';
import { FindAllProjectUseCase } from '@data/usecases/project/find-all-project.usecase';
import { FindByIdProjectUseCase } from '@data/usecases/project/find-by-id-project.usecase';
import { UpdateProjectUseCase } from '@data/usecases/project/update-project.usecase';
import { CreateProjectDto } from '@infra/dtos/project/create-project.dto';
import { UpdateProjectDto } from '@infra/dtos/project/update-project.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
} from '@nestjs/common';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectUseCase: FindAllProjectUseCase,
    private readonly findByIdProjectUseCase: FindByIdProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll(@Headers('page') page: number, @Headers('perPage') perPage: number) {
    return this.findAllProjectUseCase.execute({
      page: +page,
      perPage: +perPage,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdProjectUseCase.execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.updateProjectUseCase.execute({ id, newData: updateProjectDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteProjectUseCase.execute({ id });
  }
}
