import { CreateWorkerUseCase } from '@data/usecases/worker/create-worker.usecase';
import { DeleteWorkerUseCase } from '@data/usecases/worker/delete-worker.usecase';
import { FindAllWorkerUseCase } from '@data/usecases/worker/find-all-worker.usecase';
import { FindByIdWorkerUseCase } from '@data/usecases/worker/find-by-id-worker.usecase';
import { UpdateWorkerUseCase } from '@data/usecases/worker/update-worker.usecase';
import { CreateWorkerDto } from '@infra/dtos/worker/create-worker.dto';
import { UpdateWorkerDto } from '@infra/dtos/worker/update-worker.dto';
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

@Controller('worker')
export class WorkerController {
  constructor(
    private readonly createWorkerUseCase: CreateWorkerUseCase,
    private readonly findAllWorkerUseCase: FindAllWorkerUseCase,
    private readonly findByIdWorkerUseCase: FindByIdWorkerUseCase,
    private readonly updateWorkerUseCase: UpdateWorkerUseCase,
    private readonly deleteWorkerUseCase: DeleteWorkerUseCase,
  ) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.createWorkerUseCase.execute(createWorkerDto);
  }

  @Get()
  findAll(@Headers('page') page: number, @Headers('perPage') perPage: number) {
    return this.findAllWorkerUseCase.execute({
      page: +page,
      perPage: +perPage,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdWorkerUseCase.execute({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.updateWorkerUseCase.execute({ id, newData: updateWorkerDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteWorkerUseCase.execute({ id });
  }
}
