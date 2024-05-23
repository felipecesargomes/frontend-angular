import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidacaoPagamento]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidacaoPagamentoDirective,
    multi: true
  }]
})
export class ValidacaoPagamentoDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const valor = control.value;
    if(control.parent && (control.parent.controls as { [key: string]: AbstractControl<any, any>; })['data'].value) {
    }
    return null;

}
}