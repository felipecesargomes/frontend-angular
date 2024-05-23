import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './pages/login/shared/auth.service';  // Atualize o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);  // Redireciona para a página inicial se o usuário estiver autenticado
      return false;
    }
    return true;
  }
}