import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterColumnWorkerNumber1691716527739
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "worker" ALTER COLUMN "number" TYPE VARCHAR(10)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "worker" ALTER COLUMN "number" TYPE INT`
    )
  }
}
