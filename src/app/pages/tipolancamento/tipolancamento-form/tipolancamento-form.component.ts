import { PlanoContaService } from './../../planoconta/shared/planoconta.service';
import { PlanoConta } from './../../planoconta/shared/planoconta.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoLancamento } from '../shared/tipolancamento.model';
import { TipoLancamentoService } from '../shared/tipolancamento.service';
import { MessageService } from 'primeng/api';
import { TipoTransacao } from '../../lancamento/shared/tipotransacao.enum';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipolancamento-form',
  templateUrl: './tipolancamento-form.component.html',
  styleUrls: ['./tipolancamento-form.component.css'],
  providers: [MessageService]
})
export class TipoLancamentoComponent implements OnInit {
  barraDeProgressoLista: boolean = false;

  novoTipoLancamento: TipoLancamento = new TipoLancamento();
  tipoLancamento: TipoLancamento = new TipoLancamento();
  listaTiposLancamento: TipoLancamento[] = [];
  planosDeConta: PlanoConta[] = [];
  tiposDeTransacao: any[] = [];
  isPlanoContaEnabled: boolean = false;
  filteredPlanosDeConta: PlanoConta[] = [];

  //Traz TemplateForm para dentro do componente TS
  @ViewChild('f') form?: NgForm;


  constructor(
    private tipoLancamentoService: TipoLancamentoService,
    private planoContaService: PlanoContaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.carregarTiposLancamento();
    this.carregarPlanosDeConta();
    this.carregarTiposDeTransacao();
  }

  cadastrarTipoLancamento(): void {
    if (this.form?.valid) {
      this.tipoLancamentoService.create(this.novoTipoLancamento).subscribe({
        next: () => {
          this.showSuccess("Sucesso!","Tipo de Lançamento atualizado com sucesso.");
          this.resetarForm();
          this.carregarTiposLancamento();
        },
        error: () => {

        }
      });
    } else {
      this.showError("Erro!","Ocorreu algum erro ao atualizar o tipo de lançamento.");
    }
  }

  carregarTiposDeTransacao(): void {
    this.tiposDeTransacao = (Object.keys(TipoTransacao) as Array<keyof typeof TipoTransacao>).map(key => {
      return { label: key, value: TipoTransacao[key] };
    });
  }

  carregarTiposLancamento(): void {
    this.barraDeProgressoLista = true;
    this.tipoLancamentoService.getAllNotSistema().subscribe({
      next: (tipos) => {
        this.listaTiposLancamento = tipos;
        this.barraDeProgressoLista = false;
      },
      error: (error) => {
        this.barraDeProgressoLista = true;
      }
    }
    );
  }

  carregarPlanosDeConta(): void {
    this.planoContaService.getAll().subscribe((planosConta) => {
      this.planosDeConta = planosConta;
    })
  }

  editarTipoLancamento(tipo: TipoLancamento): void {
    this.novoTipoLancamento = new TipoLancamento(
      tipo.id,
      tipo.descricao,
      tipo.planoConta,
      tipo.tipoTransacao,
      tipo.sistema
    );
    this.onTipoTransacaoChange();
  }

  deletarTipoLancamento(id: number): void {
    this.tipoLancamentoService.delete(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tipo de Lançamento deletado com sucesso!' });
      this.carregarTiposLancamento();
    });
  }


  resetarForm(): void {
    this.novoTipoLancamento = new TipoLancamento();
    this.filteredPlanosDeConta = this.planosDeConta;
    this.form?.resetForm(); // Resetar o formulário de template
  }

  onTipoTransacaoChange(): void {
    if (this.novoTipoLancamento.tipoTransacao === TipoTransacao.RECEITA) {
      this.filteredPlanosDeConta = this.planosDeConta.filter(plano => plano.descricao === 'Receita Bruta');
    } else {
      this.filteredPlanosDeConta = this.planosDeConta.filter(plano => plano.descricao !== 'Receita Bruta');
    }
  }

  showError(titulo:string, mensagem: string) {
    this.messageService.add({ severity: 'error', summary: titulo, detail: mensagem });
  }

  showSuccess(titulo:string, mensagem: string) {
    this.messageService.add({ severity: 'success', summary: titulo, detail: mensagem });
  }



}
