import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Estado } from 'src/app/utils/cidades-estados/estado.model';
import { Cidade } from 'src/app/utils/cidades-estados/cidade.modal';
import { CidadeEstadoService } from 'src/app/utils/cidades-estados/cidades-estados.service';
import { Cnpj } from '../shared/cnpj.model';
import { CnpjService } from '../shared/cnpj.service';
import { Subject, debounceTime } from 'rxjs';

// Classe auxiliar para ajudar a salvar no banco de dados
export class Cnpj2 {
  constructor(
    public id?: number,
    public nome?: string,
    public cidade?: Cidade,
    public cnpj?: string,
    public estado?: Estado
  ) { }

  get label(): string {
    return `${this.cnpj} - ${this.nome}`; // Ou qualquer outra combinação de propriedades que você preferir
  }
}

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css'],
  providers: [MessageService]
})
export class CnpjComponent implements OnInit, AfterViewInit {
  cnpj: Cnpj2 = new Cnpj2(); // Instância de Cnpj2 para armazenar dados do formulário
  cnpj_post: Cnpj = new Cnpj(); // Instância de Cnpj para enviar dados ao servidor
  listaLojas: Cnpj[] = []; // Lista de lojas carregadas do servidor
  barraDeProgressoLista: boolean = false; // Flag para exibir barra de progresso durante o carregamento da lista de lojas
  listaCidades: Cidade[] = []; // Lista de cidades carregadas do servidor
  listaEstados: Estado[] = []; // Lista de estados carregados do servidor
  filteredCidades: Cidade[] = []; // Lista de cidades filtradas com base no estado selecionado
  validationErrors: string[] = []; // Lista de erros de validação do formulário
  private searchSubject = new Subject<string>(); // Assunto para realizar pesquisa de cidades com debounce

  constructor(
    private cidadeService: CidadeEstadoService, // Serviço para carregar cidades
    private estadoService: CidadeEstadoService, // Serviço para carregar estados
    private cdr: ChangeDetectorRef, // Detector de mudanças
    private cnpjService: CnpjService, // Serviço para interagir com lojas (CRUD)
    private messageService: MessageService // Serviço para exibir mensagens (toasts)
  ) { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Detecta mudanças após a exibição da visualização
  }

  ngOnInit(): void {
    // Carregar cidades e estados ao iniciar o componente
    this.carregarLojas();
    this.cidadeService.getCidades().subscribe({
      next: (cidades) => {
        this.listaCidades = cidades;
        this.searchCidade({ query: '' });
      }
    });

    this.estadoService.getEstados().subscribe({
      next: (estados) => {
        this.listaEstados = estados;
      }
    });

    // Configurar pesquisa de cidades com debounce
    this.searchSubject.pipe(debounceTime(150)).subscribe(query => {
      this.filteredCidades = this.listaCidades
        .filter(cidade => cidade.state?.id === this.cnpj.estado?.id)
        .filter(cidade => cidade.name?.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10);
    });
  }

  // Método para carregar a lista de lojas
  carregarLojas(): void {
    this.barraDeProgressoLista = true;
    this.cnpjService.getAll().subscribe({
      next: (lojas) => {
        this.listaLojas = lojas;
        this.barraDeProgressoLista = false;
      },
      error: () => {
        this.barraDeProgressoLista = true;
      }
    });
  }

  // Método para acionar a pesquisa de cidades
  searchCidade(event: any) {
    this.searchSubject.next(event.query);
  }

  // Método para atualizar o estado selecionado
  mudarEstado(event: any) {
    this.cnpj.estado = event.value;
    this.cnpj.cidade = undefined;
  }

  // Método para atualizar a cidade selecionada
  onCidadeSelect(event: any) {
    this.cnpj.cidade = event.value;
  }

  // Método acionado ao enviar o formulário
  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Se o formulário for inválido, coleta os erros de validação e exibe-os
      this.collectValidationErrors(form);
      this.showValidationErrors();
    } else {
      // Se o formulário for válido, prepara os dados para envio ao servidor
      this.cnpj_post.id = this.cnpj.id;
      this.cnpj_post.cidade = this.cnpj.cidade?.name;
      this.cnpj_post.cnpj = this.cnpj.cnpj;
      this.cnpj_post.estado = this.cnpj.estado?.name;
      this.cnpj_post.nome = this.cnpj.nome;

      if (this.cnpj.id) {
        // Se houver um ID, significa que é uma atualização de loja existente
        this.cnpjService.create(this.cnpj_post).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja atualizada com sucesso!' });
            form.resetForm(); // Limpa o formulário
            this.carregarLojas(); // Recarrega a lista de lojas
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar a loja. Tente novamente.' });
          }
        });
      } else {
        // Se não houver ID, significa que é uma nova loja a ser criada
        this.cnpjService.create(this.cnpj_post).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja salva com sucesso!' });
            form.resetForm();
            this.carregarLojas();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a loja. Tente novamente.' });
          }
        });
      }
    }
  }

  // Método para editar uma loja existente
  editLoja(loja: Cnpj) {
    this.cnpj = new Cnpj2(loja.id, loja.nome, this.listaCidades.find(cidade => cidade.name === loja.cidade), loja.cnpj, this.listaEstados.find(estado => estado.name === loja.estado));
    this.qtdNumCnpj = this.cnpj.cnpj?.length;
  }

  // Método para excluir uma loja
  deleteLoja(id: number) {
    this.cnpjService.delete(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Loja excluída com sucesso!' });
        this.carregarLojas();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir a loja. Tente novamente.' });
      }
    });
  }

  // Método para coletar erros de validação do formulário
  collectValidationErrors(form: NgForm) {
    this.validationErrors = [];
    for (const controlName in form.controls) {
      const control = form.controls[controlName];
      if (control.errors) {
        for (const errorName in control.errors) {
          switch (errorName) {
            case 'required':
              this.validationErrors.push(`O campo ${controlName} é obrigatório.`);
              break;
            case 'minlength':
              this.validationErrors.push(`O campo ${controlName} deve ter no mínimo ${control.errors['minlength'].requiredLength} caracteres.`);
              break;
            case 'appValidacaoCidade':
              this.validationErrors.push(`Verifique se cidade foi selecionada.`);
              break;
   
            default:
              this.validationErrors.push(`Erro no campo ${controlName}: ${errorName}`);
              break;
          }
        }
      }
    }
  }

  // Método para exibir erros de validação
  showValidationErrors() {
    this.validationErrors.forEach(error => {
      this.messageService.add({ severity: 'error', summary: 'Verifique os campos do formulário', detail: error });
    });
  }

  // Método para redefinir o formulário
  resetar() {
    this.cnpj = new Cnpj2();
    this.qtdNumCnpj = 0;
  }

  // Variável para controlar a visibilidade do modal de confirmação de exclusão
  displayDeleteConfirmation: boolean = false;

  // Variável para armazenar o ID da loja a ser excluída
  deleteLojaId: number = 0;

  // Método para abrir o modal de confirmação de exclusão
  openDeleteConfirmation(id: number) {
    this.deleteLojaId = id;
    this.displayDeleteConfirmation = true;
  }

  // Método para cancelar a exclusão e fechar o modal
  cancelDelete() {
    this.displayDeleteConfirmation = false;
  }

  // Método para confirmar a exclusão e realizar a exclusão da loja
  confirmDelete() {
    this.displayDeleteConfirmation = false;
    // Chame o método deleteLoja passando o ID da loja a ser excluída
    this.deleteLoja(this.deleteLojaId);
  }

  qtdNumCnpj: number | undefined = undefined; // Inicializado como undefined

  handleCnpjInput(event: any) {
      // Obtém o valor atual do campo CNPJ
  let cnpjValue = event.target.value;

  // Calcula o comprimento do valor atual do CNPJ
  let cnpjLength = cnpjValue.replace(/\D/g, '').length;

  // Atribui o comprimento calculado a qtdNumCnpj
  this.qtdNumCnpj = cnpjLength;

  }
  


}