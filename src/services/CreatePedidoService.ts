import Pedido from '../models/Pedido';
import AppError from '../errors/AppError';

import { startOfMinute } from 'date-fns';

import PedidosRepository from '../repositories/PedidosRepository';
import { getCustomRepository } from 'typeorm'


interface Request {
    requester_id: string,
    peso: string,
    adicionais: string,
    dataPedido: Date,
}

class CreatePedidoService {
    //função async sempre retorna PROMISE. Então no retorno PROMISE<TipoDoretorno>
    public async execute({ requester_id, peso, adicionais, dataPedido }: Request): Promise<Pedido> {

        const pedidosRepository = getCustomRepository(PedidosRepository);
        
        //zerando o minuto do pedido, para evitar pedido duplicado no mesmo minuto.
        const dataPedidoSemSegundos = startOfMinute(dataPedido);

        //verificando se já existe pedido naquele minuto.
        const buscarPedidoNoMesmoMinuto = await pedidosRepository.buscarPorDataNoMesmoMinuto(dataPedidoSemSegundos);

        if (buscarPedidoNoMesmoMinuto) {
            throw new AppError('Aguarde 1 minuto para realizar um novo pedido!');
        }

        //criação do pedido
        const pedido = pedidosRepository.create({
            requester_id,
            peso,
            adicionais,
            dataPedido: dataPedidoSemSegundos,
        });

        await pedidosRepository.save(pedido);
        
        return pedido;
    }
}

export default CreatePedidoService;