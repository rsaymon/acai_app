//adicionando informações ao REQUEST da bib EXPRESS
declare namespace Express{
    export interface Request{
        user: {
            id: string;
        };
    }
}