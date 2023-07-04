import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  async checkLogin(url: string): Promise<boolean | UrlTree> {
    console.log('hit authGuard?');

    if (await this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url;

    return this.router.parseUrl('/landing');
  }
}
