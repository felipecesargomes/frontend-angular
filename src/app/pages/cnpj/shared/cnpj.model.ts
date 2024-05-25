import { Estado } from "src/app/utils/cidades-estados/estado.model";

export class Cnpj {
    
    constructor(
        public id?: number,
        public nome?: string,
        public cidade?: string,
        public cnpj?: string,
        public estado?: Estado
    ) {

    }
    get label(): string {
        return `${this.cnpj} - ${this.nome}`; // Ou qualquer outra combinação de propriedades que você preferir
    }

}