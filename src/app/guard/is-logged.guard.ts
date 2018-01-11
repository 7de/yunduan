import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class IsLoggedGuard implements CanActivate {

  isLoggedIn = Cookie.check('currentCompanyAuthorization');

  constructor(
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  /**
   * isLoggedIn
   * @returns {boolean}
   */
  checkLogin(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
