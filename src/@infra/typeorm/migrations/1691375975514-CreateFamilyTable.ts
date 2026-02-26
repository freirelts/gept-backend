import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFamilyTable1691375975514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'family',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'is_rented',
            type: 'boolean',
          },
          {
            name: 'rent_price',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('family')
  }
}
