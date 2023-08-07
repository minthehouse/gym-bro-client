import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'workout',
        loadChildren: () => import('../tab1/workout.routing').then(m => m.routes),
      },
      {
        path: 'diet',
        loadChildren: () => import('../tab2/diet.routing').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('../tab3/profile.routing').then(m => m.routes),
      },
      {
        path: '',
        redirectTo: '/tabs/workout',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/workout',
    pathMatch: 'full',
  },
];
