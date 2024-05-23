import { AuthService } from './../../../pages/login/shared/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  usuarioLogado?: string;

  constructor(
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.AuthService.getUsuarioAutenticado();
  }
 
}
