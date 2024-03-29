import { Routes } from '@angular/router';
import { DietPage } from './diet.page';

export const routes: Routes = [
  {
    path: '',
    component: DietPage,
  },
  {
    path: 'track',
    loadChildren: () => import('./track-diet/track-diet.routing').then(m => m.routes),
  },
  {
    path: 'history',
    loadChildren: () => import('./history-diet/history-diet.routing').then(m => m.routes),
  },
  {
    path: 'success',
    loadChildren: () => import('../components/success/success.routing').then(m => m.routes),
  },
];
