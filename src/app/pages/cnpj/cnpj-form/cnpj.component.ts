import { Estado } from 'src/app/utils/cidades-estados/estado.model';
import { CidadeEstadoService } from './../../../utils/cidades-estados/cidades-estados.service';
import { Cnpj } from './../shared/cnpj.model';
import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/utils/cidades-estados/cidade.modal';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {

  cnpj: Cnpj = new Cnpj();

  // Este é o array de lojas que será preenchido com os dados fictícios
  listaLojas: any[] = [];

  barraDeProgressoLista: boolean = false;
  listaCidades: Cidade[] = [];
  filteredCidades: any[] = [];

  constructor(
    private cidadeEstadoService: CidadeEstadoService
  ) { }

  ngOnInit(): void {
    this.carregarLojasFicticias();
    this.cidadeEstadoService.getCidades().subscribe({
      next: (cidades) => {
        this.listaCidades = cidades;
      }
    });
  }

  cadastrarLoja(): void {

  }

  carregarLojasFicticias(): void {
    this.barraDeProgressoLista = true;
    setTimeout(() => {
      this.listaLojas = [
        { id: 1, nome: 'Loja A', endereco: 'Rua 1, Número 100' },
        { id: 2, nome: 'Loja B', endereco: 'Rua 2, Número 200' },
        { id: 3, nome: 'Loja C', endereco: 'Rua 3, Número 300' },
        { id: 4, nome: 'Loja D', endereco: 'Rua 4, Número 400' },
        { id: 5, nome: 'Loja E', endereco: 'Rua 5, Número 500' },
        { id: 6, nome: 'Loja F', endereco: 'Rua 6, Número 600' },
        { id: 7, nome: 'Loja G', endereco: 'Rua 7, Número 700' },
        { id: 8, nome: 'Loja H', endereco: 'Rua 8, Número 800' },
        { id: 9, nome: 'Loja I', endereco: 'Rua 9, Número 900' },
        { id: 10, nome: 'Loja J', endereco: 'Rua 10, Número 1000' },
      ];
      this.barraDeProgressoLista = false;
    }, 2000); // Simula um atraso na resposta
  }

  searchCidade(event: any) {
    const query = event.query;
    if (query) {
      this.filteredCidades = this.listaCidades.filter(cidade => {
        return cidade.name?.toLowerCase().startsWith(query.toLowerCase());
      }).slice(0, 3); // Limita a três primeiras opções
    } 
  }
  
  

}
