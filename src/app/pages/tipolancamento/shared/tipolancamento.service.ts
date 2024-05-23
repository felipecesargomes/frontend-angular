import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppConfig } from 'src/app/utils/config/config';
import { TipoLancamento } from './tipolancamento.model';
import { TipoTransacao } from '../../lancamento/shared/tipotransacao.enum';
import { Usuario } from '../../login/shared/usuario.model';
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
    const url = AppConfig.apiUrl + 'tipoLancamento/' + '${id}';
    return this.http.put<TipoLancamento>(this.apiUrl, tipoLancamento).pipe(
      catchError(this.handleError),
      map(() => tipoLancamento)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${AppConfig.apiUrl}tipoLancamento/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  getAll(): Observable<TipoLancamento[]> {
    return this.http.get<TipoLancamento[]>(this.apiUrl).pipe(
        map((tiposLancamento: TipoLancamento[]) => {
            return tiposLancamento.map(tipoLancamento => {
                tipoLancamento.descricaoConcatenada = this.getDescricaoConcatenada(tipoLancamento);
                return tipoLancamento;
            });
        }),
        catchError(this.handleError)
    );
}

private getDescricaoConcatenada(tipoLancamento: TipoLancamento): string {
    if (tipoLancamento.tipoTransacao === TipoTransacao.RECEITA) {
        return '+ ' + tipoLancamento.descricao;
    } else {
        return '- ' + tipoLancamento.descricao;
    }
}


  getById(id: number): Observable<TipoLancamento> {
    const url = AppConfig.apiUrl + 'tipoLancamento/' + '${id}'

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToTipoLancamento)
    )

  }

  private jsonDataToTipoLancamentos(jsonData: any[]): TipoLancamento[] {
    const lancamentos: TipoLancamento[] = [];
    jsonData.forEach(element => lancamentos.push(element as TipoLancamento));
    return lancamentos;
  }

  private jsonDataToTipoLancamento(jsonData: any): TipoLancamento {
    return jsonData as TipoLancamento;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO =>, ", error);
    return throwError(error);
  }
}