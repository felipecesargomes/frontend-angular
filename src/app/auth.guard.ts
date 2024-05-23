import { AuthService } from './pages/login/shared/auth.service';
//import { authGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean {
      const authenticated = this.authService.isAuthenticated();
      if(authenticated) {
        //console.log('teste')
        //this.router.navigate(['/home'])
        return true;
      } else {
        //console.log('erro')
        this.router.navigate(['/login'])
        return false;
      }
    }

}