import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('cpp_access_token');

    if( tokenString ) {
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt
        },
        
      })
    }

  // Adicionando logs para depuração
  //console.log('Request Headers:', request.headers);
  //console.log('Request Body:', request.body);

    return next.handle(request);
  }
}
