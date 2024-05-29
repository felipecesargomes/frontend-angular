import { TipoTransacao } from "../../lancamento/shared/tipotransacao.enum";
import { PlanoConta } from "../../planoconta/shared/planoconta.model";

export class TipoLancamento {

    constructor(
        public id?: number,
        public descricao?: string,
        public planoConta?: PlanoConta,
        public tipoTransacao?: TipoTransacao,
        //public descricaoConcatenada?: string,
        public sistema?: string
    ) {

    }

    get descricaoConcatenada(): string {
        if (this.tipoTransacao === TipoTransacao.RECEITA) {
            return `+ ${this.descricao}`;
        } else {
            return `- ${this.descricao}`;
        }
    }
    


    // Métodos adicionais, se necessário
}