import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterColumnFamilyNumber1691717020537
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "family" ALTER COLUMN "number" TYPE VARCHAR(10)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "family" ALTER COLUMN "number" TYPE INT`
    )
  }
}
