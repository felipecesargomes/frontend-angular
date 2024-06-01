import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ImageModule } from 'primeng/image';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Card1Component } from './card1/card1.component';
import { Form1Component } from './form1/form1.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ImageModule,
    ConfirmDialogModule,
    SharedModuleModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class TemplateModule { }
