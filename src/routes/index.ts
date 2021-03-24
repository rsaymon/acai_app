import { Router } from 'express';
import pedidosRouter from './pedidos.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

import "reflect-metadata";

const routes = Router();

//toda roda que inicie com /pedidos vai ser repassada para dentro do pedidosRouter
routes.use('/pedidos', pedidosRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)


export default routes;