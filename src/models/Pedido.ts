import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import User from './User';


//decorator entity informa que vai ser passada a informação da classe PEDIDO para o banco.
//é preciso informar O QUE É COLUNA DO BANCO ou não.
@Entity('pedidos')
class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    requester_id: string;

    /**
     * Um USER tem UM relacionamento
     * Um USER para MUITOS relacionamentos [x]
     * Muitos USERS para MUITOS relacionamentos
     */

    //Estou dentro de PEDIDOS, ENTÃO -> Muitos pedidos para 1 usuário
    //Função que vai retornar qual model deve utilizar (USER).
    //JoinColumn -> qual que é a coluna que vai identificar o usuário que faz o pedido.
    @ManyToOne(() => User)
    @JoinColumn({name:'requester_id'})
    requester: User;

    @Column('text')
    peso: string;

    @Column('text')
    adicionais: string;

    @Column('timestamp with time zone')
    dataPedido: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //construtor que vai criar omitindo o ID, pois é gerado dinamicamente pela lib uuid
    //COM O BANCO, É CRIADO DE FORMA AUTOMATICA! Não precisa do construtor.
    // constructor({peso, adicionais, dataPedido}: Omit<Pedido, 'id'>) {
    //     this.id = uuid_v4();
    //     this.peso = peso;
    //     this.adicionais = adicionais;
    //     this.dataPedido = dataPedido;
    //}
}

export default Pedido;