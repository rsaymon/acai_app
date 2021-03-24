import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    //armazenando na própria app / disco da máquina
    //dirname é o caminho em qualquer computador até a pasta config, depois volta duas pastas
    //e salva na pasta temp
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            //gerando um rash aleatório para colocar no inicio do nome do arquivo + nome original
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    })
}