import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/shared/auth.service';
import { CnpjService } from './../../../pages/cnpj/shared/cnpj.service';
import { Cnpj } from 'src/app/pages/cnpj/shared/cnpj.model';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogado?: string;
  selectedLojas: any[] = [];
  listLojas: Cnpj[] = [];

  @ViewChild('multiSelect') multiSelect?: MultiSelect; // Referência para o componente p-multiSelect

  constructor(
    private authService: AuthService,
    private router: Router,
    private cnpjService: CnpjService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado()?.toLocaleUpperCase();
    this.listarLojas();
  }

  listarLojas() {
    this.cnpjService.getAll().subscribe({
      next: (lojas: any[]) => {
        this.listLojas = lojas;
        this.recuperarLojasSelecionadas(); // Recupera as lojas selecionadas após obter a lista de lojas
      },
      error: (error) => {
        console.error('Erro ao listar lojas:', error);
      }
    });
  }

  onLojasSelected(event: any) {
    this.selectedLojas = event.value;
    localStorage.setItem('lojasSelecionadas', JSON.stringify(this.selectedLojas));
  }

  recuperarLojasSelecionadas() {
    const lojasSelecionadas = localStorage.getItem('lojasSelecionadas');
    if (!lojasSelecionadas) {
      // Se não houver lojas selecionadas no localStorage, selecionar todas automaticamente
      this.selectedLojas = this.listLojas.map(loja => loja); // Supondo que 'id' seja o identificador único da loja
      localStorage.setItem('lojasSelecionadas', JSON.stringify(this.selectedLojas));
      
  
    } else {
      this.selectedLojas = JSON.parse(lojasSelecionadas);
    }
  }

  logout() {
    localStorage.removeItem('lojasSelecionadas');
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  isHomeRoute(): boolean {
    // Verifica se a rota atual é a rota home
    return this.router.url === '/home';
  }
}
