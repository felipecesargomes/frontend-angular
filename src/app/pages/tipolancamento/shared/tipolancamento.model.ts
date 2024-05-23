import { TipoTransacao } from "../../lancamento/shared/tipotransacao.enum";
import { PlanoConta } from "../../planoconta/shared/planoconta.model";

export class TipoLancamento {

    constructor(
        public id?: number,
        public descricao?: string,
        public idPlanoConta?: PlanoConta,
        public tipoTransacao?: TipoTransacao,
        public descricaoConcatenada?: string
    ) {

    }


    // Métodos adicionais, se necessário
}