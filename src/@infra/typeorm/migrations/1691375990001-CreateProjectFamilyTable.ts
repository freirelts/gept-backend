import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProjectFamilyTable1691375990001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_family',
        columns: [
          {
            name: 'project_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'family_id',
            type: 'varchar',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['project_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'project',
            onDelete: 'CASCADE',
          },
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
    await queryRunner.dropTable('project_family')
  }
}
