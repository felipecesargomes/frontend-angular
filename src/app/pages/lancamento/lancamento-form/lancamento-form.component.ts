import { TipoLancamento } from './../../tipolancamento/shared/tipolancamento.model';
import { TipoLancamentoService } from './../../tipolancamento/shared/tipolancamento.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService } from '../shared/lancamento.service';

import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CnpjService } from '../../cnpj/shared/cnpj.service';
import { Cnpj } from '../../cnpj/shared/cnpj.model';
import { TipoTransacao } from '../shared/tipotransacao.enum';
import { NgForm } from '@angular/forms';
import { Lancamento } from '../shared/lancamento.model';
import { Table } from 'primeng/table';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})


export class LancamentoFormComponent implements OnInit {

  lancamento: Lancamento = new Lancamento();
  listaLancamentos: Lancamento[] = [];
  visible: boolean = false;
  deleteModalVisible: boolean = false; // Adicionando a propriedade deleteModalVisible
  idIncremental: number = 1;
  pt: any;
  TipoTransacao = TipoTransacao;
  checked: boolean = false;
  today: string = this.formatDateToISO(new Date());
  tiposTransacao?: TipoTransacao[];


  //Nome das modais
  pageTitle?: string = 'Criar Lançamento';

  @ViewChild('f') form?: NgForm;

  //Verificação do preenchimento de loja no modal
  lojaValidacao: boolean = false;

  barraDeProgressoLista: boolean = false;
  barraDeProgressoCreate: boolean = false;
  //Alertas com mensagens de erro
  messagesError: boolean = false;

  //=============================================================================================
  // Listagens pertencentes a outras classes
  //=============================================================================================
  //Listas
  tiposLancamento: any[] = [];
  lojasLancamento?: Cnpj[];

  //Selecionados nas listas
  selectedTipoLancamento: any;

  filteredTiposLancamento: any[] = [];

  //Condicionais para verificar validade
  tipoLancamentoValido?: boolean;
  mensagem = '';

  //Campos para pesquisa
  descricaoPesquisa: String | undefined;
  dataLancamentoPesquisaInicio: Date | undefined;
  dataLancamentoPesquisaFinal: Date | undefined;
  tipoLancamentoPesquisa: TipoLancamento | undefined;
  tipoTransacaoPesquisa: string | undefined; // Adicione esta linha


  //==============================================================================================
  // Construtor injetando os services necessários e configurações para o componente
  //=============================================================================================
  constructor(
    private lancamentoService: LancamentoService,
    private tipoLancamentoService: TipoLancamentoService,
    private cnpjService: CnpjService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService) {
  }



  ngOnInit() {
    this.today = this.formatDateToISO(new Date());
    this.listAll();
    //=============================================================================================
    // Fazer a listagem de objetos pertencentes a outra tabela
    //=============================================================================================
    this.tipoLancamentoService.getAll().subscribe({
      next: (tipos) => {
        this.tiposLancamento = tipos;
      },
      error: (error) => {

      }
    });
    //=============================================================================================
    // Fazer a listagem de objetos pertencentes a outra tabela
    //=============================================================================================
    this.cnpjService.getAllFilteredByLocalStorage().subscribe({
      next: (lojas) => {
        this.lojasLancamento = lojas;
      }
    });
    //=============================================================================================
    // Configuração do componente de calendario para português
    //=============================================================================================
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };

    this.primengConfig.setTranslation(this.pt);

    // Converter enum em uma lista
    this.tiposTransacao = Object.values(TipoTransacao);

  }
  //=============================================================================================
  // Funções para filtrar autocomplete (sugestão)
  //=============================================================================================
  filterTipoLancamento(event: any) {


    let query = event.query;
    let filteredResults;

    if (this.tiposLancamento && this.tiposLancamento.length) {
      if (query.includes('[-]') || query.includes('[+]')) {
        filteredResults = this.tiposLancamento.filter(tipo => {
          if (tipo.tipo.toLowerCase() === query.trim().toLowerCase())
            this.lancamento.tipoLancamento = tipo;
          return tipo.tipo.toLowerCase().includes(query.toLowerCase());
        }).sort((a, b) => b.tipo.toLowerCase().localeCompare(a.tipo.toLowerCase())); // Ordenar por tipo
      } else {
        filteredResults = this.tiposLancamento.filter(tipo => {
          if (tipo.descricao.toLowerCase() === query.trim().toLowerCase())
            this.lancamento.tipoLancamento = tipo;
          return tipo.descricao.toLowerCase().includes(query.toLowerCase());
        }).sort((a, b) => b.tipo.toLowerCase().localeCompare(a.tipo.toLowerCase())); // Ordenar por tipo;
      }
      // Verificar se há um valor selecionado
      if (this.selectedTipoLancamento) {
        // Se tiver texto, retornar apenas uma sugestão
        this.filteredTiposLancamento = filteredResults;
      } else {
        // Se não tiver texto, retornar até dez sugestões
        this.filteredTiposLancamento = filteredResults;
      }
    }
  }

  //=============================================================================================
  // Eventos do input do autocomplete
  //=============================================================================================

  onTipoLancamentoSelect(event: any) {
    this.lancamento.tipoLancamento = event.value;
    this.tipoLancamentoValido = true;
  }

  // onKeyLancamentos(event: any) {
  //   let query = event.currentTarget.defaultValue.toLowerCase(); // Converta para minúsculas
  //   let dadoEncontrado = this.tiposLancamento.find(tipo => {
  //     return tipo.tipo.toLowerCase() === query.toLowerCase();
  //   });

  //   if (dadoEncontrado) {
  //     //this.tipoLancamentoValido = true;
  //     this.lancamento.tipoLancamento = dadoEncontrado;
  //     //this.onTipoLancamentoSelect(dadoEncontrado);
  //     //this.lancamento.tipoLancamento = dadoEncontrado;
  //   } else {
  //     this.filterTipoLancamento(event);
  //   }
  // }

  //=============================================================================================
  // Funções para executar CRUD
  //=============================================================================================

  
  // listAll() {
  //   this.barraDeProgressoLista = true;
  //   const lojasSelecionadas: Cnpj[] | undefined = this.getLojasSelecionadasFromLocalStorage();
  //   this.lancamentoService.getAll().subscribe({
  //     next: (lancamentos) => {
  //       this.listaLancamentos = lancamentos.map((lancamento, index) => {
  //         return { ...lancamento, idIncremental: index + 1, today: new Date() };
  //       }).filter;
  //     },
  //     error: (error) => {
  //       //console.log(error);
  //       this.barraDeProgressoLista = true;
  //       this.showError("Erro!", "Ocorreu um erro ao tentar obter a lista, verifique com nossa equipe.");
  //     },
  //     complete: () => {
  //       this.barraDeProgressoLista = false;
  //     }
  //   });
  // }

  listAll() {
    this.barraDeProgressoLista = true;
    const lojasSelecionadas: Cnpj[] | undefined = this.getLojasSelecionadasFromLocalStorage();
    //console.log(lojasSelecionadas);
    this.lancamentoService.getAll().subscribe({
      next: (lancamentos) => {
        if (lojasSelecionadas?.length===0) {
          // Se lojasSelecionadas for undefined, retorna todos os lançamentos
          this.listaLancamentos = lancamentos.map((lancamento, index) => {
            return { ...lancamento, idIncremental: index + 1, today: new Date() };
          });
        } else {
          // Se lojasSelecionadas não for undefined, filtra os lançamentos
          this.listaLancamentos = lancamentos.map((lancamento, index) => {
            return { ...lancamento, idIncremental: index + 1, today: new Date() };
          }).filter(lancamento => 
            lojasSelecionadas?.some(loja => loja.id === lancamento.cnpj?.id)
          );
        }
      },
      error: (error) => {
        //console.log(error);
        this.barraDeProgressoLista = false;
        this.showError("Erro!", "Ocorreu um erro ao tentar obter a lista, verifique com nossa equipe.");
      },
      complete: () => {
        this.barraDeProgressoLista = false;
      }
    });
  } 
  
  private getLojasSelecionadasFromLocalStorage(): Cnpj[] | undefined {
    const lojasSelecionadasString = localStorage.getItem('lojasSelecionadas');
    if (lojasSelecionadasString) {
      return JSON.parse(lojasSelecionadasString);
    }
    return undefined; // Retorna undefined se não houver lojas selecionadas
  }

  delete(lancamento: Lancamento) {
    if (lancamento && lancamento.id !== undefined) {
      this.lancamentoService.delete(lancamento.id).subscribe(
        {
          next: () => {
            // Remover o lançamento da lista após a deleção bem-sucedida
            this.listaLancamentos = this.listaLancamentos.filter(item => item.id !== lancamento.id);
          },
          error: (error) => {
            //console.error('Ocorreu um erro ao excluir o lançamento:', error);
          },
          complete: () => {
            //console.log('A operação de exclusão de lançamento foi concluída.');
            this.lancamento = new Lancamento();
            this.hideShowDeleteModal();
          }
        }
      );
    } else {
      //console.error('Não foi possível excluir o lançamento: ID inválido.');
    }
  }

  //=============================================================================================
  // Funções para manipular modal
  //=============================================================================================

  createOrUpdateModal(lancamento?: Lancamento) {
    this.pageTitle = lancamento ? 'Editar Lançamento' : 'Novo Lançamento';
    //console.log(lancamento?.cnpj);
    if (lancamento) {
      // Copiar os dados do lançamento fornecido para o modelo
      this.lancamento.id = lancamento.id;
      this.lancamento.descricaoLancamento = lancamento.descricaoLancamento;
      if (lancamento.valor !== undefined) {
        this.lancamento.valor = Math.abs(lancamento.valor);
      }
      this.lancamento.dataLancamento = lancamento.dataLancamento;
      if (lancamento.cnpj?.id !== null) {
        this.lancamento.cnpj = lancamento.cnpj;
        this.lojaValidacao = true;
      } else {
        this.lojaValidacao = false;
      }
      this.lancamento.tipoLancamento = lancamento.tipoLancamento;
      if (lancamento.status === 'S') {
        this.checked = true;
      } else {
        this.checked = false;
      }
      if (this.lancamento.tipoLancamento) {
        this.lancamento.tipoLancamento.tipoTransacao = lancamento.tipoLancamento?.tipoTransacao || TipoTransacao.DESPESA;
      }

    } else {
      // Reinicializar o modelo se nenhum lançamento for fornecido
      this.checked = false;
      this.lancamento = new Lancamento();
      this.lojaValidacao = false;
    }
    this.visible = true;
  }

  hideCreateOrUpdateModal() {
    this.visible = false;
    this.barraDeProgressoCreate = false;
    this.messagesError = false;
    this.checked = false;
    this.lancamento = new Lancamento();
    this.lojaValidacao == false

  }

  showDeleteModal(lancamento: Lancamento): void {
    this.deleteModalVisible = true;
    this.lancamento = lancamento;
  }

  hideShowDeleteModal(): void {
    this.deleteModalVisible = false;
    this.lancamento = new Lancamento();
  }

  //=============================================================================================
  // Ação do botão da modal para deletar registro
  //=============================================================================================

  deleteAction() {
    if (this.lancamento && this.lancamento.id !== undefined) {
      this.lancamentoService.delete(this.lancamento.id).subscribe({
        next: () => {
          // Remover o lançamento da lista após a deleção bem-sucedida
          this.listAll();
          this.messageService.add({ severity: 'sucess', summary: 'Deletado com sucesso!', detail: 'Usuário deletado com sucesso!' });
        },
        error: (error) => {
          //console.error('Ocorreu um erro ao excluir o lançamento:', error);
        },
        complete: () => {
          //console.log('A operação de exclusão de lançamento foi concluída.');
          this.hideShowDeleteModal();
        }
      });
    } else {
      //console.error('Não foi possível excluir o lançamento: ID inválido.');
    }
  }

  //=============================================================================================
  // Calcular somatório no footer
  //=============================================================================================

  getTotalRevenue(): number {
    return this.listaLancamentos.reduce((total, lancamento) => {
      // Verificar se 'valor' está definido antes de adicioná-lo a 'total'
      if (lancamento.valor !== undefined) {
        return total + lancamento.valor;
      }
      return total;
    }, 0);
  }

  //=============================================================================================
  // Submeter formulário
  //=============================================================================================

  onSubmit(form: NgForm) {
    //console.log(form.valid);
    if (form.valid) {
      if (this.checked == true) {
        this.lancamento.status = 'S';
      } else {
        this.lancamento.status = 'N';
      }
      this.lancamentoService.create(this.lancamento).subscribe({
        next: (response) => {
          // Lógica para tratamento de sucesso
          this.lancamento = new Lancamento();
          this.barraDeProgressoCreate = true;

          this.messageService.add({ severity: 'success', summary: 'Successo!', detail: 'Lançamento salvo com sucesso!' });
          this.hideCreateOrUpdateModal();
          form.reset;
        },
        error: (error) => {
          // Lógica para tratamento de erro
          this.barraDeProgressoCreate = true;
          this.messagesError = true;
          this.mensagem = 'Ocorreu um erro. Por favor, tente novamente.'
        },
        complete: () => {
          this.listAll();
        }
      });
    } else {
    }
  }

  //=============================================================================================
  // Formulário de pesquisa
  //=============================================================================================

  pesquisar(form: NgForm) {
    //console.log(form.value);
    //console.log(typeof this.dataLancamentoPesquisaFinal);
    const params = {
      descricao: this.descricaoPesquisa,
      tipoLancamento: this.tipoLancamentoPesquisa,
      dataLancamentoInicio: this.dataLancamentoPesquisaInicio,
      dataLancamentoFinal: this.dataLancamentoPesquisaFinal,
      tipoTransacao: this.tipoTransacaoPesquisa
    };

    this.lancamentoService.getFiltro(params).subscribe(
      (data: Lancamento[]) => {
        // Movendo a atribuição para dentro do bloco de subscrição
        //data = { ...data, idIncremental: index + 1 };
        this.listaLancamentos = data;
      },
      (error) => {
        //console.error('Erro ao buscar lançamentos:', error);
        this.showError("Erro!", "Ocorreu um erro na pesquisa, tente novamente. Se o problema persistir entre em contato com nossa equipe.");
      },
      () => {
        //Se der sucesso!
      }
    );
  }

  resetarCampos(form: NgForm) {
    form.resetForm();
    // Também pode ser necessário redefinir os valores dos campos manualmente se houver campos que não são afetados pelo resetForm()
    this.descricaoPesquisa = undefined;
    this.tipoLancamentoPesquisa = undefined;
    this.dataLancamentoPesquisaInicio = undefined;
    this.dataLancamentoPesquisaFinal = undefined;
    this.listAll();

  }

  //=============================================================================================
  // Comparação de datas por interpolação 
  //=============================================================================================

  formatDateToISO(date: Date | string): string {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
      }
    }
    return ''; // Retorna uma string vazia se não for possível formatar a data
  }

  //=============================================================================================
  // Mudança no dropdown da loja
  //=============================================================================================

  mudarLoja(e: any) {
    let id = Number(e.target.value);
    this.lancamento.cnpj = undefined
    this.cnpjService.getById(id).subscribe({
      next: (loja) => {
        this.lancamento.cnpj = loja;
        this.lojaValidacao = true;
        //console.log(this.lancamento.cnpj)
      },
      error: (error) => {
        this.lojaValidacao = false;
        this.lancamento.cnpj = undefined
      }
    });
  }

  //=============================================================================================
  // Função util
  //=============================================================================================

  removerAcentos(s: any) {
    if (!s) {
      return '';
    }
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s\+\-]/g, '');
  }

  //=============================================================================================
  // Exportar Arquivo Excel
  //=============================================================================================

  fileName = "Relatorio.xlsx";

  @ViewChild('tablelancamento') table?: Table;

  exportExcel() {
    if (this.table && this.table.value) {
      // Remover o campo 'today' dos dados antes de converter para planilha Excel
      const dataWithoutFields = this.removeFields(this.table.value);

      // Ordenar os dados pelo campo 'id' antes de converter para planilha Excel
      const sortedData = dataWithoutFields.sort((a, b) => {
        // Comparando os valores dos IDs para ordenação
        return a.dataLancamento - b.dataLancamento;
      });

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sortedData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }
  }


  removeFields(data: any[]): any[] {
    // Copiar os dados para um novo array sem o campo 'today' e adicionando a loja extraída
    return data.map(item => {
      //console.log(item);
      let situacao;
      if (item.status === 'S')
        situacao = "BAIXADO";
      else
        situacao = "NÃO BAIXADO";
      let descricao = item.descricaoLancamento.toUpperCase();
      let loja = item.cnpj.label.toUpperCase();
      let data = item.dataLancamento;
      let tipo_lancamento = item.tipoLancamento.descricao.toUpperCase();
      const { today, id, idIncremental, dataCadastro, dataLancamento, descricaoLancamento, status, tipoLancamento, cnpj, ...rest } = item;
      return { id, descricao, data, ...rest, loja, tipo_lancamento, situacao }; // Adicionando a loja extraída ao objeto retornado
    });
  }

  showError(titulo: string, mensagem: string) {
    this.messageService.add({ severity: 'error', summary: titulo, detail: mensagem });
  }

}
