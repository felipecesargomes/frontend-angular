import { Cnpj } from "../../cnpj/shared/cnpj.model";
import { TipoLancamento } from "../../tipolancamento/shared/tipolancamento.model";
import { TipoTransacao } from "./tipotransacao.enum";


export class Lancamento {

  constructor(
    public id?: number,
    public descricaoLancamento?: string,
    public valor?: number,
    public dataLancamento?: Date,
    public tipoLancamento?: TipoLancamento,
    public cnpj?: Cnpj,
    public status?: string
  ) { } 
  

  // Métodos adicionais, se necessário
}