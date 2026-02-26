export class ProjectEntity {
  constructor(
    id: string,
    name: string,
    description: string,
    active: boolean,
    daysOfWork: string[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.active = active;
    this.daysOfWork = daysOfWork;
  }

  id: string;
  name: string;
  description: string;
  active: boolean;
  daysOfWork: string[];
}
