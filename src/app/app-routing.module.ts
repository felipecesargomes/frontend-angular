import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LancamentoFormComponent } from './pages/lancamento/lancamento-form/lancamento-form.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './auth.guard';
import { CnpjComponent } from './pages/cnpj/cnpj-form/cnpj.component';
import { LoginRedirectGuard } from './login-redirect.guard';
import { TipoLancamentoComponent } from './pages/tipolancamento/tipolancamento-form/tipolancamento-form.component';
import { PerfilFormComponent } from './pages/perfil/perfil-form/perfil-form.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'lancamento', component: LancamentoFormComponent, canActivate: [authGuard] },
      { path: 'loja', component: CnpjComponent, canActivate: [authGuard] },
      { path: 'tipolancamento', component: TipoLancamentoComponent, canActivate: [authGuard] },
      { path: 'perfil', component: PerfilFormComponent, canActivate: [authGuard] },
      { path: '', redirectTo: "home", pathMatch: 'full' },
      { path: '**', redirectTo: "home", pathMatch: 'full' }
    ]
  },
  // Outras rotas podem ser definidas fora do contexto do servidor aqui, se necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
