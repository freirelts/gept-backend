export class CreateFamilyDto {
  // street: Yup.string().required('Rua é obrigatório'),
  street: string;

  // number: Yup.string().required('Número é obrigatório'),
  number: string;

  // neighborhood: Yup.string().required('Bairro é obrigatório'),
  neighborhood: string;

  // complement: Yup.string(),
  complement: string;

  // isRented: Yup.boolean().required('Alugado? é obrigatório'),
  isRented: boolean;

  // rentPrice: Yup.number().required('Aluguel é obrigatório'),
  rentPrice: number;

  // projects: Yup.array<string>(),
  projects: string[];

  // persons: Yup.array()
  //   .of(personValidationSchema)
  //   .defined()
  //   .min(1, 'Pessoas da familía precisa ser preenchido')
  //   .required('Pessoas da familía é obrigatório'),
  persons: CreatePersonDto[];
}

export class CreatePersonDto {
  // name: Yup.string().required('Nome é obrigatório'),
  name: string;

  // email: Yup.string().required('Email é obrigatório'),
  email: string;

  // isOwner: Yup.boolean().required('Titular? é obrigatório'),
  isOwner: boolean;

  // document: Yup.string().required('RG/CPF é obrigatório'),
  document: string;

  // kin: Yup.string().required('Parentesco é obrigatório'),
  kin: string;

  // occupation: Yup.string().required('Ocupação é obrigatório'),
  occupation: string;

  // wage: Yup.number().required('Salario é obrigatório'),
  wage: number;

  // wageSources: Yup.string().required('Fonte salarial é obrigatório'),
  wageSources: string;

  // nis: Yup.string().required('Nis é obrigatório'),
  nis: string;

  // schooling: Yup.string().required('Escolaridade é obrigatório'),
  schooling: string;

  // birthdate: Yup.date().required('Data de nascimento é obrigatório'),
  birthdate: Date;

  // phone: Yup.string().required('Telefone é obrigatório'),
  phone: string;

  // isWhatsApp: Yup.boolean().required('WhatsApp é obrigatório'),
  isWhatsApp: boolean;

  // phone_2: Yup.string(),
  phone2: string;

  // isWhatsApp2: Yup.boolean(),
  isWhatsApp2: boolean;
}
