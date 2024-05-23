import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidacaoValor]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidacaoValorDirective,
    multi: true
  }]
})
export class ValidacaoValorDirective implements Validator {

  constructor() {
   }

   validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    // Convertendo o valor para um número para garantir a comparação correta
    const valorNumerico = parseFloat(valor);
    return (valorNumerico <= 0) ? {'appValidacaoValor': true} : null;
  }
  

}