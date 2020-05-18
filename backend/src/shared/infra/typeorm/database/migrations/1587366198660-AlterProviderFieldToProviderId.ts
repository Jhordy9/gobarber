import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1587366198660
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({ name: 'provider_id', type: 'uuid', isNullable: true }),
    );

    // Quando se está lidando com banco relacional, é preciso criar uma chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        // Qual o nome da coluna que irá receber a chave estrangeira
        columnNames: ['provider_id'],
        // Qual é o nome da coluna na tabela usuário que irá ser relacionado
        referencedColumnNames: ['id'],
        // Qual tabela de referência
        referencedTableName: 'users',
        // O que vai acontecer com os agendamentos do usuário, caso ele seja deletado
        // RESTRICT - Não irá deixar o usuário ser deletado
        // SET NULL - Vai setar o provider_id como nulo
        // CASCADE - Se deletar o provider, deleta todos os agendamentos
        onDelete: 'SET NULL',
        // Caso o id seja alterado
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Para desfazer é necessário sempre ir na ordem contrária do up

    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
