import User from '../models/User';
import AppError from '../errors/AppError';

import UsersRepository from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm'

import { hash } from 'bcryptjs'

interface Request {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {
    //função async sempre retorna PROMISE. Então no retorno PROMISE<TipoDoretorno>
    public async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        
        const checkUserExists = await usersRepository.findOne({
            where: {email}
        });

        if (checkUserExists){
            throw new AppError ('Email já cadastrado!', 400);
        }

        const hashPassword = await hash(password, 8);

        //criação do usuário
        const user = usersRepository.create({
            name,
            email,
            password:hashPassword,
        });

        await usersRepository.save(user);
        
        return user;
    }
}

export default CreateUserService;