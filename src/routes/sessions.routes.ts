import { Router } from 'express';

import SessionService from '../services/SessionService';

const sessionsRouter = Router();
//informando que pedidos é do tipo PEDIDO definido acima    

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const createSession = new SessionService();

        //execute ta retornando void
        const { user, token } = await createSession.execute({
            email,
            password,
        });

        //@ts-expect-error Aqui vai ocorrer um erro por o delete ser opcional, mas estou ignorando
        delete user.password;

        return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});


export default sessionsRouter;
