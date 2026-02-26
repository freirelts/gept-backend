import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProjectWorkerTable1691334617048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_worker',
        columns: [
          {
            name: 'project_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'worker_id',
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
            columnNames: ['worker_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'worker',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_worker')
  }
}
