import { Component } from '@angular/core';
import { AuthService } from 'src/app/pages/login/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuarioLogado?: string;

  constructor(
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.AuthService.getUsuarioAutenticado();
  }

}

