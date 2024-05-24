import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  novaLoja: any = {
    id: 0,
    nome: '',
    endereco: ''
  };
  messages1: Message[] = [];

  cadastrarLoja(): void {
    // Simula o cadastro da nova loja (geralmente seria uma chamada a uma API)
    // Aqui você pode adicionar a lógica para salvar a nova loja
    this.novaLoja.id = this.listaLojas.length + 1;
    this.listaLojas.push(this.novaLoja);

    // Limpa o formulário após o cadastro
    this.novaLoja = { id: 0, nome: '', endereco: '' };
  }

  // Este é o array de lojas que será preenchido com os dados fictícios
  listaLojas: any[] = [];

  barraDeProgressoLista: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.carregarLojasFicticias();
    this.messages1 = [
      { severity: 'warn', summary: 'Tela Protótipo', detail: 'Essa tela é um protótipo' },
    ];
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

}
