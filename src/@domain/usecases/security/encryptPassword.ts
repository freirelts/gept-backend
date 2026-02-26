export interface EncryptPassword {
  encrypt(password: string): Promise<string>;
}
