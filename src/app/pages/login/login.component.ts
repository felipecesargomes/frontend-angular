import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './shared/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username?: string;
  password?: string;
  loginError?: boolean;
  mensagemSucesso?: string;
  errors?: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngAfterViewInit() {
    // Seu código aqui será executado após a renderização completa da página
    const tokenString = localStorage.getItem('cpp_access_token');

    if (tokenString) {
      // Se existe um valor, apaga a chave 'access_token' do localStorage
      localStorage.removeItem('cpp_access_token');
    }

  }

  onSubmit() {
    this.authService
      .tentarLogar(this.username ?? '', this.password ?? '')
      .subscribe(response => {

        //Guardar no localstorage
        const cpp_access_token = JSON.stringify(response);
        localStorage.setItem('cpp_access_token', cpp_access_token)
        this.router.navigate(['/home'])
        //console.log(response);
      }, errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s)']
      })
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .create(usuario)
      .subscribe(response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
        this.loginError = false;
      }, error => {
        this.loginError = true;
        this.mensagemSucesso = "";
      })
  }

}
