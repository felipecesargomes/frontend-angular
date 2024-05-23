import { TipoLancamentoService } from './../../tipolancamento/shared/tipolancamento.service';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ValidacaoValorDirective } from './validacao-valor.directive';
import { TipoLancamento } from '../../tipolancamento/shared/tipolancamento.model';

@Directive({
  selector: '[appValidacaoTipoLancamento]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidacaoTipoLancamentoDirective,
    multi: true
  }]
})
export class ValidacaoTipoLancamentoDirective implements Validator {

  tipoLancamento: TipoLancamento[] = []; // Define o array para armazenar os resultados

  constructor(private tipoLancamentoService: TipoLancamentoService) { }

  ngOnInit(): void {
    this.tipoLancamentoService.getAll().subscribe(
      (tiposLancamento: TipoLancamento[]) => {
        this.tipoLancamento = tiposLancamento; // Armazena os resultados no array
      },
      error => {
        console.error('Erro ao obter tipos de lançamento:', error);
      }
    );
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    
    let valor = control.value;
    if (valor instanceof Object) {
      valor = valor.descricao;
    } else if (valor instanceof String) {
      valor = valor.substring(4); // Caso contrário, trata valor como string
    }
 
    // Verifica se algum item em tipoLancamento possui a mesma descrição que valor
    const found = this.tipoLancamento.some(tipo => tipo.descricao === valor);

    // Retorna um erro de validação se o valor não for encontrado

    return found ? null : { 'appValidacaoTipoLancamento': true };

  }
}