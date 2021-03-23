

/**
 * Linha do tempo
 * 1 semana -> nova tabela de agendamentos
 * 2 semana -> nova tabela de usuários
 * 3 semana -> novo dev entrou no time e editou a tabela de AGENDAMENTOS
 * 4 semana -> nova tabela de compras (mas eu não sabia)... então o meu BD ta diferente do BD do novo DEV
 * 
 * 
 */

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreatePedidos1616407615621 implements MigrationInterface {

    //up é a ação a ser feita
    //down é a ação a ser feita caso a ação UP não seja feita.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pedidos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'requester_id',
                        type: 'varchar',
                    },
                    {
                        name: 'peso',
                        type: 'varchar',
                    },
                    {
                        name: 'adicionais',
                        type: 'varchar',
                    },
                    {
                        name: 'dataPedido',
                        type: 'timestamp with time zone',
                    },
                    //horario que o usuário foi criado
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    //horario que o usuário foi atualizado pela ultima vez
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
            })
        ),
        await queryRunner.createForeignKey('pedidos', new TableForeignKey({
            //criando uma relação de chave estrangeira entre requester_id de PEDIDOS com id de USERS.
            name: 'requesterPedido',
            columnNames: ['requester_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            //caso o usuário seja deletado, o que fazer? linha abaixo
            //onDelete: 'Restrect' -> não permite o usuário ser deletado / 'SET_NULL' seta como nulo
            //ou CASCADE -> deleta todos os pedidos que ele está relacionado.
            onDelete: 'SET NULL',
            //Caso o ID do usuário seja alterado (MUITO DIFICIL), modifique em todos os relacionamentos
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pedidos', 'requesterPedido');
        
        await queryRunner.dropTable('pedidos');
    }

}
