import { Routes } from '@angular/router';
import { WorkoutPage } from './workout.page';

export const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
  {
    path: 'track',
    loadChildren: () => import('./track-workout/track-workout.routing').then(m => m.routes),
  },
  {
    path: 'history',
    loadChildren: () => import('./history-workout/history-workout.routing').then(m => m.routes),
  },
  {
    path: 'success',
    loadChildren: () => import('../components/success/success.routing').then(m => m.routes),
  },
];
