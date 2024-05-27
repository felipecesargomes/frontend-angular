import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tipolancamento-form',
  templateUrl: './tipolancamento-form.component.html',
  styleUrls: ['./tipolancamento-form.component.css']
})
export class TipoLancamentoComponent implements OnInit {
  novoTipoLancamento: any = {
    id: 0,
    descricao: '',
    planoConta: '',
    tipoTransacao: ''
  };

  messages1: Message[] = []; // Inicializa como um array vazio

  planosDeConta = [
    { label: 'Plano A', value: 'planoA' },
    { label: 'Plano B', value: 'planoB' },
    { label: 'Plano C', value: 'planoC' }
  ];

  tiposDeTransacao = [
    { label: 'Transação A', value: 'transacaoA' },
    { label: 'Transação B', value: 'transacaoB' },
    { label: 'Transação C', value: 'transacaoC' }
  ];

  listaTiposLancamento: any[] = [];

  barraDeProgressoLista: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.carregarTiposLancamentoFicticios();
    this.messages1 = [
      { severity: 'warn', summary: 'Tela Protótipo', detail: 'Essa tela é um protótipo' },
    ];
  }

  cadastrarTipoLancamento(): void {
    this.novoTipoLancamento.id = this.listaTiposLancamento.length + 1;
    this.listaTiposLancamento.push(this.novoTipoLancamento);
    this.novoTipoLancamento = { id: 0, descricao: '', planoConta: '', tipoTransacao: '' };
  }

  carregarTiposLancamentoFicticios(): void {
    this.barraDeProgressoLista = true;
    setTimeout(() => {
      this.listaTiposLancamento = [
        { id: 1, descricao: 'Tipo A', planoConta: 'Plano A', tipoTransacao: 'Transação A' },
        { id: 2, descricao: 'Tipo B', planoConta: 'Plano B', tipoTransacao: 'Transação B' },
        // Adicione mais tipos de lançamento fictícios aqui
      ];
      this.barraDeProgressoLista = false;
    }, 2000); // Simula um atraso na resposta
  }
}
