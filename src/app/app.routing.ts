import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routing').then(m => m.routes),
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.routing').then(m => m.routes),
    // canActivate: [RedirectGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.routing').then(m => m.routes),
    // canActivate: [RedirectGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.routing').then(m => m.routes),
    // canActivate: [RedirectGuard],
  },
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
