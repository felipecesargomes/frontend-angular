import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.apiUrl}usuario/`;
  tokenURL: string = environment.apiUrlAcess + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  JwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {

   }

   obterToken() {
    const tokenString = localStorage.getItem('cpp_access_token');
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token
      //console.log(token)
      return token;
    }
    return null;
   }

   encerrarSessao() {
    localStorage.removeItem('cpp_access_token');
   }

   getUsuarioAutenticado() {
    const token = this.obterToken();
    if(token) {
      const usuario = this.JwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
   }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token) {
      const expired = this.JwtHelper.isTokenExpired(token);
      //console.log(expired)
      return !expired;
    } 
    return false;
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.apiUrl, Usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    return this.http.post(this.tokenURL, params.toString(), { headers: headers } )

  }

}