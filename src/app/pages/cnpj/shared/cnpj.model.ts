export class Cnpj {
    
    constructor(
        public id?: number,
        public nome?: string,
        public cidade?: string,
        public cnpj?: string
    ) {

    }
    get label(): string {
        return `${this.cnpj} - ${this.nome}`; // Ou qualquer outra combinação de propriedades que você preferir
    }

}