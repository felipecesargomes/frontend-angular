import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnpjComponent } from './cnpj-form/cnpj.component';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';



@NgModule({
  declarations: [
    CnpjComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [
    CnpjComponent
  ]
})
export class CnpjModule { }
