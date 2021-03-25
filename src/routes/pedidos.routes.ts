import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import PedidosRepository from '../repositories/PedidosRepository';
import CreatePedidoService from '../services/CreatePedidoService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pedidosRouter = Router();

//usando o middleware de autenticação em todas as rotas de pedidos.
//Caso quisesse usar só em uma rota, colocar antes do async, dentro do método
pedidosRouter.use(ensureAuthenticated);

pedidosRouter.get('/', async (request, response) => {
    const pedidosRepository = getCustomRepository(PedidosRepository);
    const pedidos = await pedidosRepository.find();

    return response.json(pedidos);
});


pedidosRouter.post('/', async (request, response) => {

    const { requester_id, peso, adicionais, dataPedido } = request.body;

    //converte a data para um tipo DATE do java.
    const parsedDataPedido = parseISO(dataPedido);

    const createPedido = new CreatePedidoService();

    //chamando o serviço
    const pedido = await createPedido.execute({ requester_id, peso, adicionais, dataPedido: parsedDataPedido });

    return response.json(pedido);

});

export default pedidosRouter;
