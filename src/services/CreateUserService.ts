import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm'


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
            throw new Error ('Email já cadastrado!');
        }


        //criação do usuário
        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);
        
        return user;
    }
}

export default CreateUserService;