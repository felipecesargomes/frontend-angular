import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Cidade } from 'src/app/utils/cidades-estados/cidade.modal';
import { CidadeEstadoService } from 'src/app/utils/cidades-estados/cidades-estados.service';

@Directive({
    selector: '[appValidacaoCidade]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: ValidacaoCidadeDirective,
      multi: true
    }]
  })
  export class ValidacaoCidadeDirective implements Validator {
  
    listaCidade: Cidade[] = []; // Define o array para armazenar os resultados
  
    constructor(private cidadeService: CidadeEstadoService) { }
  
    ngOnInit(): void {
      this.cidadeService.getCidades().subscribe(
        (cidades: Cidade[]) => {
          this.listaCidade = cidades; // Armazena os resultados no array
        },
        error => {
        }
      );
    }
  
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      
      let valor = control.value;
      if (valor instanceof Object) {
        valor = valor.name;
      } else if (valor instanceof String) {
        valor = valor.substring(4); // Caso contrário, trata valor como string
      }
   
      // Verifica se algum item em tipoLancamento possui a mesma descrição que valor
      const found = this.listaCidade.some(cidade => cidade.name === valor);
  
      // Retorna um erro de validação se o valor não for encontrado
  
      return found ? null : { 'appValidacaoCidade': true };
  
    }
  }