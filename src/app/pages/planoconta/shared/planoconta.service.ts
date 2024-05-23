import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoConta } from './planoconta.model';
import { AppConfig } from 'src/app/utils/config/config';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanoContaService {

  private apiUrl: string = environment.apiUrl + 'planoconta/';

  constructor(private http: HttpClient) { }

  salvar(planoConta: PlanoConta): Observable<PlanoConta> {
    return this.http.post<PlanoConta>(this.apiUrl, planoConta);
  }

  editar(planoConta: PlanoConta): Observable<PlanoConta> {
    return this.http.put<PlanoConta>(this.apiUrl, planoConta);
  }

  getAllPlanoConta(): Observable<PlanoConta[]> {
    return this.http.get<PlanoConta[]>(this.apiUrl);
  }
}
