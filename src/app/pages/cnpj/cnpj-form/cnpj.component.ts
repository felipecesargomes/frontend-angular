import { Estado } from 'src/app/utils/cidades-estados/estado.model';
import { CidadeEstadoService } from './../../../utils/cidades-estados/cidades-estados.service';
import { Cnpj } from './../shared/cnpj.model';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/utils/cidades-estados/cidade.modal';
import { Subject, debounceTime } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CnpjService } from '../shared/cnpj.service';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit, AfterViewInit {

  cnpj: Cnpj = new Cnpj();

  // Este é o array de lojas que será preenchido com os dados fictícios
  listaLojas: any[] = [];

  barraDeProgressoLista: boolean = false;
  listaCidades: Cidade[] = [];
  listaEstados: Estado[] = []
  filteredCidades: any[] = [];

  private searchSubject = new Subject<string>();


  constructor(
    private cidadeService: CidadeEstadoService,
    private estadoService: CidadeEstadoService,
    private cdr: ChangeDetectorRef,
    private cnpjService: CnpjService
  ) { }
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.carregarLojas();

    this.cidadeService.getCidades().subscribe({
      next: (cidades) => {
        this.listaCidades = cidades;
        this.searchCidade({ query: '' }); // Chamando a função searchCidade após receber os dados
      }
    });

    this.estadoService.getEstados().subscribe({
      next: (estados) => {
        this.listaEstados = estados;
      }
    })
    this.searchSubject.pipe(
      debounceTime(150)
    ).subscribe(query => {
      this.filteredCidades = this.listaCidades
        .filter(cidade => cidade.state?.id === this.cnpj.estado?.id) // Filtra as cidades pelo estado selecionado
        .filter(cidade => cidade.name?.toLowerCase().includes(query.toLowerCase())) // Filtra as cidades pelo nome
        .slice(0, 10); // Limita a três primeiras opções
    });
    

  }

  carregarLojas(): void {
    this.barraDeProgressoLista = true;
    this.cnpjService.getAll().subscribe({
      next: (lojas) => {
        this.listaLojas = lojas;
        this.barraDeProgressoLista = false;
      },
      error: (error) => {
        this.barraDeProgressoLista = true;
      },
      complete: () => {
      },
    })
  }

  searchCidade(event: any) {

    // Uso do filtro do autocomplete sem debounce
    // console.log(this.cnpj.estado?.id);

    // const query = event.query.toLowerCase();
  
    // this.filteredCidades = this.listaCidades
    //   .filter(cidade => cidade.state?.id === this.cnpj.estado?.id && cidade.name?.toLowerCase().startsWith(query))
    //   .slice(0, 3);
    
    // console.log(this.filteredCidades); // Verifique os resultados filtrados no console
    // // Em seguida, você pode remover esta linha de console.log se não precisar mais dela. console.log(this.cnpj.estado?.id);
    this.searchSubject.next(event.query);
  }

  mudarEstado(event: any) {
    this.cnpj.estado = event.value;
  }

  onCidadeSelect(event: any) {
    this.cnpj.cidade = event.value;
    console.log(this.cnpj)
   // this.tipoLancamentoValido = true;
  }

  onSubmit(form: NgForm) {
    console.log(form);
  } 


}
