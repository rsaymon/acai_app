import { isThisHour } from 'date-fns';
import { Entity, EntityRepository , Repository} from 'typeorm';

import Pedido from '../models/Pedido';

//DTO - DATA TRANSFER OBJECT -> dar formato a um objeto para não ter perda de função, caso modifique.
// {colocar assim} é para quebrar o CreatePedidoDTO e pegar especificamente o argumetno

// interface CreatePedidoDTO {
//     peso: string,
//     adicionais: string,
//     dataPedido: Date,
// }

@EntityRepository(Pedido)
class PedidosRepository extends Repository<Pedido>{
    //Verificação se existe algum pedido no mesmo minuto.
    public async buscarPorDataNoMesmoMinuto(dataPedido: Date): Promise<Pedido | null >{
        const buscarPedido = await this.findOne({
            where: {dataPedido},
        });
        return buscarPedido || null;
    }
}

export default PedidosRepository;