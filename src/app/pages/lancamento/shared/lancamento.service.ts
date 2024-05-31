import { TipoLancamento } from './../../tipolancamento/shared/tipolancamento.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Lancamento } from '../shared/lancamento.model';
import { TipoTransacao } from './tipotransacao.enum';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiUrl: string = environment.apiUrl + 'lancamento/';

  constructor(
    private http: HttpClient
  ) { }

  create(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl, lancamento);
  }

  update(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}${lancamento.id}`, lancamento).pipe(
      catchError(this.handleError),
      map(() => lancamento)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  getAll(): Observable<Lancamento[]> {

    return this.http.get<Lancamento[]>(this.apiUrl).pipe(
      map((lancamentos: Lancamento[]) =>
        lancamentos.map(lancamento => {
          //Pipe que pecorre todos os valores compara com DESPESA e seta valor negativo.
          if (lancamento.tipoLancamento?.tipoTransacao === TipoTransacao.DESPESA && lancamento.valor !== undefined) {
            lancamento.valor = lancamento.valor * -1;
          }
          return lancamento;
        })
      ),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getFiltro(params: any): Observable<Lancamento[]> {
    //Seta parametros no cabeçalho
    let httpParams = new HttpParams();
    if (params.descricao) {
      httpParams = httpParams.set('descricao', params.descricao);
    }
    if (params.tipoLancamento) {
      httpParams = httpParams.set('tipoLancamento', params.tipoLancamento);
    }
    if (params.dataLancamentoInicio) {
      httpParams = httpParams.set('dataLancamentoInicio', params.dataLancamentoInicio);
    }
    if (params.dataLancamentoFinal) {
      httpParams = httpParams.set('dataLancamentoFinal', params.dataLancamentoFinal);
    }
    if (params.dataPagamentoInicio) {
      httpParams = httpParams.set('dataPagamentoInicio', params.dataPagamentoInicio);
    }
    if (params.dataPagamentoFinal) {
      httpParams = httpParams.set('dataPagamentoFinal', params.dataPagamentoFinal);
    }
    if (params.tipoTransacao) {
      httpParams = httpParams.set('tipoTransacao', params.tipoTransacao);
    }

    return this.http.get<Lancamento[]>(`${this.apiUrl}filtro`, { params: httpParams }).pipe(
      map(
        (lancamentos: Lancamento[]) => lancamentos.map(
          (lancamento) => {
            if(lancamento.tipoLancamento?.tipoTransacao === TipoTransacao.DESPESA && lancamento.valor != undefined) {
              lancamento.valor = lancamento.valor * -1;
            }
            return lancamento;
          }
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO", error);
    return throwError(error);
  }

}
