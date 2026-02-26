import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDefaultUser1690731440666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "worker" (id, name, email, password, position, access_level, phone, is_whatsapp, street, number, neighborhood, city, postal_code, birthdate, active) values ('9e77408c-9f18-4626-b850-0ef3fce98726', 'GEPT Admin', 'geptadmin@email.com', '$2b$10$7zLJXGhjaAZ/U7KqpheV8uFc/BQFciuJEYnzIZBqi.Bm2e3ASLGPi', 'president', 'administrator', '88911111111', true, 'S/N', 505, 'S/N', 'Juazeiro do Norte', '63000000', '2023-07-30T00:00:00.000Z', true)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "worker" where email = 'geptadmin@email.com'
        `)
  }
}
