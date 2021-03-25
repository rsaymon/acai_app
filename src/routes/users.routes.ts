import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm'
import multer from 'multer';

import uploadConfig from '../config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.get('/', async (request, response) => {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();

    //ocultando senha na listagem
    for (let user of users) {
        user.password = '';
    }

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

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);
    } catch (err) {
        return response.status(err.statusCode).json({ error: err.message });
    }
});

//put - atualiza informação por completa, podendo editar tudo
//patch - alterar único campo
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateUserAvatarService = new UpdateUserAvatarService;
    const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    //copiando usuário sem password, para que não seja exibido
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);


});

export default usersRouter;
