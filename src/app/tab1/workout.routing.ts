import { Routes } from '@angular/router';
import { WorkoutPage } from './workout.page';
import { InitResolverService } from '../service/resolver/init.resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
    resolve: { fetch: InitResolverService },
  },
  {
    path: 'track',
    loadChildren: () => import('./track-workout/track-workout.routing').then(m => m.routes),
  },
  {
    path: 'history',
    loadChildren: () => import('./history-workout-list/history-workout-list.routing').then(m => m.routes),
  },
  {
    path: 'success',
    loadChildren: () => import('../components/success/success.routing').then(m => m.routes),
  },
  {
    path: ':id/details',
    loadChildren: () => import('./history-workout/history-workout.routing').then(m => m.routes),
  },
];
