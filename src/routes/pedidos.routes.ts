import { Router } from 'express';
import { parseISO } from 'date-fns';

import PedidosRepository from '../repositories/PedidosRepository';
import { getCustomRepository } from 'typeorm'

import CreatePedidoService from '../services/CreatePedidoService';

const pedidosRouter = Router();
//informando que pedidos é do tipo PEDIDO definido acima    

pedidosRouter.get('/', async (request, response) => {
    const pedidosRepository = getCustomRepository(PedidosRepository);
    const pedidos = await pedidosRepository.find();

    return response.json(pedidos);
});


pedidosRouter.post('/', async (request, response, next) => {
    try {
        const { requester_id, peso, adicionais, dataPedido } = request.body;

        //converte a data para um tipo DATE do java.
        const parsedDataPedido = parseISO(dataPedido);

        const createPedido = new CreatePedidoService();

        //chamando o serviço
        const pedido = await createPedido.execute({ requester_id, peso, adicionais, dataPedido: parsedDataPedido });

        return response.json(pedido);
    } catch (err){
        return response.status(400).json({error: err.message});
    }
});

export default pedidosRouter;
