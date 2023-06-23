import { Routes } from '@angular/router';
import { DietPage } from './diet.page';

export const routes: Routes = [
  {
    path: '',
    component: DietPage,
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./track-diet/track-diet.routing').then((m) => m.routes),
  },
];
