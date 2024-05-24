import { NgModule } from '@angular/core';
import { TipoLancamentoComponent } from './tipolancamento-form/tipolancamento-form.component';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';





@NgModule({
  declarations: [
    TipoLancamentoComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [
    TipoLancamentoComponent
  ]
})
export class TipolancamentoModule { }
