import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { Form1Component } from 'src/app/shared/template/form1/form1.component';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';



@NgModule({
  declarations: [
    PerfilFormComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports: [
    PerfilFormComponent
  ]
})
export class PerfilModule { }
