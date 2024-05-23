// Dentro do serviço IbgeService

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  constructor(private http: HttpClient) {}

  getDistritos(): Observable<any[]> {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
  }
}
