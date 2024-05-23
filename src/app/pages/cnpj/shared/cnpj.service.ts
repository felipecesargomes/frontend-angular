import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/utils/config/config';
import { Cnpj } from './cnpj.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

  private apiUrl: string = environment.apiUrl + 'cnpj/';

  constructor(private http: HttpClient) { }

  create(cnpj: Cnpj): Observable<Cnpj> {
    return this.http.post<Cnpj>(this.apiUrl, cnpj);
  }

  update(cnpj: Cnpj): Observable<Cnpj> {
    //const url = AppConfig.apiUrl + 'cnpj/' + '${id}';
    return this.http.put<Cnpj>(this.apiUrl, cnpj).pipe(
      catchError(this.handleError),
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
    );
  }

  getAll(): Observable<Cnpj[]> {
    return this.http.get<Cnpj[]>(this.apiUrl).pipe(
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<Cnpj> {
    const url = `${this.apiUrl}${id}`;


    return this.http.get<Cnpj>(url).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO =>, ", error);
    return throwError(error);
  }

}