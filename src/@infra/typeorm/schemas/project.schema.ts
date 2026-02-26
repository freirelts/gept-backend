import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('project')
export class ProjectSchema {
  constructor(
    id?: string,
    name?: string,
    description?: string,
    active?: boolean,
    daysOfWork?: string,
  ) {
    this.id = id || uuid();
    this.name = name!;
    this.description = description!;
    this.active = active!;
    this.daysOfWork = daysOfWork!;
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'description' })
  description!: string;

  @Column({ name: 'active', default: true })
  active!: boolean;

  @Column({ name: 'days_of_work' })
  daysOfWork!: string;
}
