import { Estado } from "./estado.model";

export class Cidade {
    
    constructor(
        public id?: number,
        public name?: string,
        public estado?: Estado
    ) {

    }

}