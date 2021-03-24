import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload'; 
import './database'

const app = express();

app.use(express.json());
//servir uma pasta de forma estática, ou seja, exibir o próprio arquivo (foto).
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333 🚀");
});
