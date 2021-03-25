import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload'; 
import './database'
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
//servir uma pasta de forma estática, ou seja, exibir o próprio arquivo (foto).
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//middleware DEPOIS das rotas, para tratar os erros gerais. OBRIGATÓRIO 4 parâmetros no express.
app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    
    //verificando se o erro foi causado pela APP para que o front trate a exceção 
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    
    console.error(err);

    //caso não, vai ser um erro desconhecido, então, passar mensagem genérica
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
})

app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333 🚀");
});
