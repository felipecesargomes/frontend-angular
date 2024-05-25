// Dentro do serviço IbgeService

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Estado } from './estado.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeEstadoService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://191.96.251.210:8080/sistemacappacitarcidades/api/cidades/';
  private apiUrl2: string = 'http://191.96.251.210:8080/sistemacappacitarcidades/api/estado/';

  getCidades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }

  

}
