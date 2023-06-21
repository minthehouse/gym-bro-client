import { Routes } from '@angular/router';
import { WorkoutPage } from './workout.page';

export const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./track-workout/track-workout.routing').then((m) => m.routes),
  },
];
