import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidacaoValorDirective } from './shared/validacao-valor.directive';
import { MessageService } from 'primeng/api';
import { ValidacaoTipoLancamentoDirective } from './shared/validacao-tipo-lancamento.directive';
import { ValidacaoPagamentoDirective } from './shared/validacao-pagamento.directive';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    ValidacaoValorDirective,
    LancamentoFormComponent,
    ValidacaoTipoLancamentoDirective,
    ValidacaoPagamentoDirective
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [
    LancamentoFormComponent
  ],
  providers: [
    MessageService
  ]
})
export class LancamentoModule { }
