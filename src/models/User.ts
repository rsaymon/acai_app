import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'


//decorator entity informa que vai ser passada a informação da classe PEDIDO para o banco.
//é preciso informar O QUE É COLUNA DO BANCO ou não.
@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;
    
    @Column('text')
    avatar: string;

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

export default User;