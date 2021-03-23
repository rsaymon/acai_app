
import { Entity, EntityRepository , Repository} from 'typeorm';

import User from '../models/User';

//DTO - DATA TRANSFER OBJECT -> dar formato a um objeto para não ter perda de função, caso modifique.
// {colocar assim} é para quebrar o CreatePedidoDTO e pegar especificamente o argumetno

// interface CreatePedidoDTO {
//     peso: string,
//     adicionais: string,
//     dataPedido: Date,
// }

@EntityRepository(User)
class UsersRepository extends Repository<User>{
    
    
}

export default UsersRepository;