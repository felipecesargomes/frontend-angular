import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LancamentoFormComponent } from './pages/lancamento/lancamento-form/lancamento-form.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './auth.guard';
import { CnpjComponent } from './pages/cnpj/cnpj-form/cnpj.component';
import { LoginRedirectGuard } from './login-redirect.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate : [authGuard] },
      { path: 'lancamento', component: LancamentoFormComponent, canActivate : [authGuard] },
      { path: 'loja', component: CnpjComponent, canActivate : [authGuard] },
      { path: '', redirectTo: "/home", pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
