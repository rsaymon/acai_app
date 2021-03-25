import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
    email: string,
    password: string,
}

interface Response {
    user: User,
    token: string,
}

class SessionService {
    //função async sempre retorna PROMISE. Então no retorno PROMISE<TipoDoretorno>
    public async execute({ email, password }: Request): Promise<Response> {

        const usersRepository = getCustomRepository(UsersRepository);
        //verificando se o usuário inserido (email) existe
        const user = await usersRepository.findOne({
            where: { email }
        });

        //verificando apenas email, mas aviso sobre email / senha para garantir segurança
        if (!user) {
            throw new AppError(' Combinação e-mail/senha incorreta!', 401);
        }

        //password é a senha que tentou login. user.password é a senha cadastrada no banco.
        const passwordVerification = await compare(password, user.password);

        if (!passwordVerification) {
            throw new AppError(' Combinação e-mail/senha incorreta!', 401);
        }
        //Se passar daqui, usuário autenticado!
        //hash gerada aleatoriamente no md5
        //primeiro parâmetro: PAYLOAD -> Informações que não serão seguras, apenas informações extras
        //segundo: hash chave de segurança
        //terceiro: configurações do token
        //subject: id do usuário que gerou o token
        //expiresIn: expira o token em 1 dia
        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default SessionService;