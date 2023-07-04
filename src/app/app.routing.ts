import { Route } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';
import { RedirectGuard } from './service/auth/redirect.guard';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routing').then(m => m.routes),
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.routing').then(m => m.routes),
    canActivate: [RedirectGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.routing').then(m => m.routes),
    canActivate: [RedirectGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.routing').then(m => m.routes),
    canActivate: [RedirectGuard],
  },
];
