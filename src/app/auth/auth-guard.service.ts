import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated =  this.authService.isAuthenticated();
    if (!authenticated) {
      alert('Please Login!');
      this.router.navigate(['/signin']);
    }
    return authenticated;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const authenticated =  this.authService.isAuthenticated();
    if (!authenticated) {
      alert('Please Login!');
      this.router.navigate(['/signin']);
    }
    return authenticated;
  }
}
