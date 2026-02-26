export interface DeleteFamily {
  execute(data: DeleteFamilyParams): Promise<void>;
}

export class DeleteFamilyParams {
  id: string;
}
