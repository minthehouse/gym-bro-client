import { Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'update-profile',
    loadChildren: () => import('../auth/goal/goal.routing').then(m => m.routes),
  },
];
