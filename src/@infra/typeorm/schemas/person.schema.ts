import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FamilySchema } from './family.schema';

@Entity('person')
export class PersonSchema {
  constructor() {
    this.id = uuid();
  }

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name' })
  name!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'is_owner' })
  isOwner!: boolean;

  @Column({ name: 'document' })
  document!: string;

  @Column({ name: 'kin' })
  kin!: string;

  @Column({ name: 'occupation' })
  occupation!: string;

  @Column({ name: 'wage' })
  wage!: number;

  @Column({ name: 'wage_sources' })
  wageSources!: string;

  @Column({ name: 'nis' })
  nis!: string;

  @Column({ name: 'schooling' })
  schooling!: string;

  @Column({ name: 'birthdate' })
  birthdate!: Date;

  @Column({ name: 'phone' })
  phone!: string;

  @Column({ name: 'is_whatsapp' })
  isWhatsApp!: boolean;

  @Column({ name: 'phone_2' })
  phone2!: string;

  @Column({ name: 'is_whatsapp_2' })
  isWhatsApp2!: boolean;

  @ManyToOne(() => FamilySchema, (family) => family.persons)
  @JoinColumn({
    name: 'family_id',
    referencedColumnName: 'id',
  })
  family!: FamilySchema;
}
