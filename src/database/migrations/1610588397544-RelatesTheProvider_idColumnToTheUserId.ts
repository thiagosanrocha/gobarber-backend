import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelatesTheProviderIdColumnToTheUserId1610588397544
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'relatesTheProvider_idColumnToTheUserId',
        columnNames: ['provider_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'relatesTheProvider_idColumnToTheUserId',
    );
  }
}
