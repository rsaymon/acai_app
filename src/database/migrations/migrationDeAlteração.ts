

/**
 *Exemplo de migration que altera a tabela PEDIDOS 
 * deleta a coluna provider e cria a coluna provider_id
 */

import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export default class CreatePedidos1616407615621 implements MigrationInterface {

    //up é a ação a ser feita
    //down é a ação a ser feita caso a ação UP não seja feita.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pedidos', 'user');
        await queryRunner.addColumn('pedidos', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
            //caso um usuário delete o perfil, os relacionamentos 
            //continuam e fica nulo em vez de apagar.
            //efeito cascata
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pedidos', 'provider_id');
        await queryRunner.addColumn('pedidos', new TableColumn({
            name: 'user',
            type: 'string',
        }));
    }

}
