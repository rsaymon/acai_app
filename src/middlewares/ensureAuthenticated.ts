//middleware que vai verificar se o usuário estará autenticado
// recebe um request, response e o next. Caso o usuário seja validado, chama next e seguem as rotas.
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT Token is missing", 401);
    }
    //dividindo o token no espaço para retirar a palavra bearer padrão do JWT
    //a virgula indica que a primeira parte não interessa, só a segunda pois vem no formato bearer oaskdoaksd(token)
    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        //pegando informação do id do usuário que realizou o pedido que vem no SUB do HEADER do TOKEN.
        const { sub } = decoded as TokenPayload; //forçando que decoded seja do tipo TokenPayload       
        
        request.user = {
            id:sub,
        };
        
        return next();
    } catch (err){
        throw new AppError ("Invalid JWT Token", 401)
    }

}