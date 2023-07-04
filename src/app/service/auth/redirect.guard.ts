import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn();
  }

  async checkLoggedIn(): Promise<boolean | UrlTree> {
    console.log('hit redirect guard?');

    if (await this.authService.isLoggedIn()) {
      console.log('is logged in?');
      return this.router.parseUrl('/tabs/workout');
    } else {
      return true;
    }
  }
}
