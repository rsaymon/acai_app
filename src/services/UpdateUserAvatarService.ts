import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import fs from 'fs';
import Path from 'path';
import { getRepository } from 'typeorm';

interface Request {
    user_id: string,
    avatarFileName: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        //user ou undefined, caso não tenha encontrado
        const user = await usersRepository.findOne(user_id);

        if(!user){
            throw new AppError("Apenas usuários autenticados podem modificar seu avatar!", 401)
        }
        //caso ja tenha avatar, deletar anterior
        if(user.avatar){
            //pegando o diretório padrão tmp e juntando ao nome do arquivo do avatar
            const userAvatarFilePath = Path.join(uploadConfig.directory, user.avatar);
            
            //garante o uso das funções do node em formato de promisses, podendo usar await para
            //aguardar o resultado / .stat traz o status do arquivo
            const userFileAvatarExists = await fs.promises.stat(userAvatarFilePath);

            //se existir uma foto já, apagar
            if(userFileAvatarExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await usersRepository.save(user);

        return user;
    }

}

export default UpdateUserAvatarService;