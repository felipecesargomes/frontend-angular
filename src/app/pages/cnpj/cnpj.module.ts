import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CnpjComponent } from './cnpj-form/cnpj.component';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { Form1Component } from 'src/app/shared/template/form1/form1.component';



@NgModule({
  declarations: [
    CnpjComponent,
    Form1Component
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
