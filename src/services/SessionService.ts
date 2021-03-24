import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';
import { getCustomRepository } from 'typeorm'

import { compare, hash } from 'bcryptjs'

interface Request {
    email: string,
    password: string,
}

interface Response {
    user: User,
}

class SessionService {
    //função async sempre retorna PROMISE. Então no retorno PROMISE<TipoDoretorno>
    public async execute({ email, password }: Request): Promise<Response> {

        const usersRepository = getCustomRepository(UsersRepository);
        //verificando se o usuário inserido (email) existe
        const user = await usersRepository.findOne({
            where: {email}
        });

        //verificando apenas email, mas aviso sobre email / senha para garantir segurança
        if (!user){
            throw new Error (' Combinação e-mail/senha incorreta!');
        }

        //password é a senha que tentou login. user.password é a senha cadastrada no banco.
        const passwordVerification = await compare(password, user.password);
        
        if (!passwordVerification){
            throw new Error (' Combinação e-mail/senha incorreta!');
        }
        //Se passar daqui, usuário autenticado!
        
        return {user};
    }
}

export default SessionService;