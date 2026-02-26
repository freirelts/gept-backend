import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateWorkerTable1690727559455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'worker',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '70',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'access_level',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'position',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'is_whatsapp',
            type: 'boolean',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'birthdate',
            type: 'timestamp',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('worker')
  }
}
