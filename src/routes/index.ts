import { Router } from 'express';
import pedidosRouter from './pedidos.routes'
import "reflect-metadata";




const routes = Router();

//toda roda que inicie com /pedidos vai ser repassada para dentro do pedidosRouter
routes.use('/pedidos', pedidosRouter)

routes.post('/users', (request, response) => {
    const { name, email } = request.body;

    const user = {
        name,
        email,
    }

    return response.json(user);
});

export default routes;