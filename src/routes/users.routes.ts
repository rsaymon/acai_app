import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm'

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
//informando que pedidos é do tipo PEDIDO definido acima    


usersRouter.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    return response.json(users);
});


usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
