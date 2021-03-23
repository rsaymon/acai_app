import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'


//decorator entity informa que vai ser passada a informação da classe PEDIDO para o banco.
//é preciso informar O QUE É COLUNA DO BANCO ou não.
@Entity('pedidos')
class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    requester_id: string;

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