import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './shared/template/template.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//PRIMENG
import { MessageService } from 'primeng/api';

//COMPONENTS
import { CnpjComponent } from './pages/cnpj/cnpj-form/cnpj.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LancamentoModule } from './pages/lancamento/lancamento.module';

//GUARDA
import { AuthService } from './pages/login/shared/auth.service';
//TOKEN INTECEPTADOR
import { TokenInterceptor } from './token.interceptor';
import { LoginRedirectGuard } from './login-redirect.guard';
import { authGuard } from './auth.guard';
import { CnpjModule } from './pages/cnpj/cnpj.module';
import { TipolancamentoModule } from './pages/tipolancamento/tipolancamento.module';
import { LoadingSpinnerComponent } from './shared/loading/loading-spinner/loading-spinner.component';
import { LoadingService } from './shared/loading/loading.service';
import { LoadingInterceptor } from './loading-interceptor.service';
import { TestesComponent } from './testes/testes.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PerfilModule } from './pages/perfil/perfil.module';


// Registra os dados de locale
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    //Componente do conteúdo da página inicial
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    LoadingSpinnerComponent,
    TestesComponent
  ],
  imports: [
    //Modulos da Aplicacao
    LancamentoModule,
    CnpjModule,
    TipolancamentoModule,
    PerfilModule,
    //Modulos de componentes (rodape, sidebar e sidebarnav)
    TemplateModule, //Importante para aplicacao
    BrowserModule, //Importante para iniciar a aplicação
    AppRoutingModule, //Importante para o app.module.ts
    RouterModule, //Importante para aplicacao - Rotas padrao da aplicacao
    
    //Modulos Essenciais
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    AuthService,
    authGuard,
    LoginRedirectGuard,
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    //Manda o Token JWT em toda requisição
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
