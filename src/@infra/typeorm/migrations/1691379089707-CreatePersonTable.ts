import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePersonTable1691379089707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'person',
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
            name: 'is_owner',
            type: 'boolean',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'document',
            type: 'varchar',
            length: '25',
          },
          {
            name: 'kin',
            type: 'varchar',
            length: '25',
          },
          {
            name: 'occupation',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'wage',
            type: 'decimal',
          },
          {
            name: 'wage_sources',
            type: 'varchar',
            length: '70',
          },
          {
            name: 'nis',
            type: 'varchar',
            length: '25',
          },
          {
            name: 'schooling',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'birthdate',
            type: 'timestamp',
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
            name: 'phone_2',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: 'is_whatsapp_2',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'family_id',
            type: 'varchar',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['family_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'family',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person')
  }
}
