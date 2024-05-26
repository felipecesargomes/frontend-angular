import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Estado } from './estado.model';
import { Cidade } from './cidade.modal';

@Injectable({
  providedIn: 'root' // Este decorator 'providedIn' do Angular significa que o serviço será um singleton e estará disponível em toda a aplicação
})
export class CidadeEstadoService {
   // Definição das URLs de API para dados relacionados
  private apiUrlCidades: string = 'http://191.96.251.210:8080/sistemacappacitarcidades/api/cidades/';
  private apiUrlEstados: string = 'http://191.96.251.210:8080/sistemacappacitarcidades/api/estado/';

  // Armazena a lista de dados relacionados
  private cidadesSubject = new BehaviorSubject<Cidade[]>([]);
  private estadosSubject = new BehaviorSubject<Estado[]>([]);

  constructor(private http: HttpClient) {}

  getCidades(): Observable<Cidade[]> {
    if (this.cidadesSubject.value.length === 0) { // Verifica se a lista de dados relacionados está vazia
      // Se a lista de dados relacionados estiver vazia, fazemos uma requisição HTTP e atualizamos o BehaviorSubject com os dados obtidos
      return this.http.get<Cidade[]>(this.apiUrlCidades).pipe(
        tap(cidades => this.cidadesSubject.next(cidades)) // Atualiza o BehaviorSubject com os dados obtidos
      );
    } else {
      // Se a lista de dados relacionados já estiver preenchida, retornamos diretamente os dados do BehaviorSubject
      return this.cidadesSubject.asObservable(); 
    }
  }

  getEstados(): Observable<Estado[]> {
    if (this.estadosSubject.value.length === 0) {
      return this.http.get<Estado[]>(this.apiUrlEstados).pipe(
        tap(estados => this.estadosSubject.next(estados))
      );
    } else {
      return this.estadosSubject.asObservable();
    }
  }
}
