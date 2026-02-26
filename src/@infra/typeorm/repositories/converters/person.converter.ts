import { PersonEntity } from '@domain/entities/person.entity';
import { PersonSchema } from '@infra/typeorm/schemas/person.schema';

export function personEntityToSchema(person: PersonEntity): PersonSchema {
  const newPerson = new PersonSchema();

  newPerson.id = person.id!;
  newPerson.name = person.name;
  newPerson.email = person.email;
  newPerson.isOwner = person.isOwner;
  newPerson.document = person.document;
  newPerson.kin = person.kin;
  newPerson.occupation = person.occupation;
  newPerson.wage = person.wage;
  newPerson.wageSources = person.wageSources;
  newPerson.nis = person.nis;
  newPerson.schooling = person.schooling;
  newPerson.birthdate = person.birthdate;
  newPerson.phone = person.phone;
  newPerson.isWhatsApp = person.isWhatsApp;
  newPerson.phone2 = person.phone2;
  newPerson.isWhatsApp2 = person.isWhatsApp2;

  return newPerson;
}

export function personSchemaToEntity(person: PersonSchema): PersonEntity {
  return {
    id: person.id!,
    name: person.name,
    email: person.email,
    isOwner: person.isOwner,
    document: person.document,
    kin: person.kin,
    occupation: person.occupation,
    wage: person.wage,
    wageSources: person.wageSources,
    nis: person.nis,
    schooling: person.schooling,
    birthdate: person.birthdate,
    phone: person.phone,
    isWhatsApp: person.isWhatsApp,
    phone2: person.phone2,
    isWhatsApp2: person.isWhatsApp2,
  };
}
