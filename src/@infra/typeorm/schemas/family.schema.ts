import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PersonSchema } from './person.schema';
import { ProjectSchema } from './project.schema';

@Entity('family')
export class FamilySchema {
  constructor() {
    this.id = uuid();
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'street' })
  street!: string;

  @Column({ name: 'number' })
  number!: string;

  @Column({ name: 'neighborhood' })
  neighborhood!: string;

  @Column({ name: 'complement' })
  complement!: string;

  @Column({ name: 'is_rented' })
  isRented!: boolean;

  @Column({
    name: 'rent_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  rentPrice!: number;

  @ManyToMany(() => ProjectSchema)
  @JoinTable({
    name: 'project_family',
    joinColumn: {
      name: 'family_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  projects!: ProjectSchema[];

  @OneToMany(() => PersonSchema, (person) => person.family, {
    cascade: ['insert', 'update'],
  })
  persons!: PersonSchema[];
}
