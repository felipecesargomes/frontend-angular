import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TipoLancamento } from './tipolancamento.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoLancamentoService {
  private apiUrl: string = environment.apiUrl + 'tipolancamento/';

  constructor(private http: HttpClient) { }

  create(tipoLancamento: TipoLancamento): Observable<TipoLancamento> {
    return this.http.post<TipoLancamento>(this.apiUrl, tipoLancamento);
  }

  update(tipoLancamento: TipoLancamento): Observable<TipoLancamento> {
    const url = `${this.apiUrl}${tipoLancamento.id}`;
    return this.http.put<TipoLancamento>(url, tipoLancamento).pipe(
      catchError(this.handleError),
      map(() => tipoLancamento)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  getAll(): Observable<TipoLancamento[]> {
    return this.http.get<TipoLancamento[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllNotSistema(): Observable<TipoLancamento[]> {
    return this.http.get<TipoLancamento[]>(this.apiUrl).pipe(
      map((tiposLancamento: TipoLancamento[]) => 
        tiposLancamento.filter(tipoLancamento => tipoLancamento.sistema !== 'S')
      ),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<TipoLancamento> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<TipoLancamento>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }
}
