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
        loadChildren: () =>
          import('../tab1/workout.routing').then((m) => m.routes),
      },
      {
        path: 'diet',
        loadChildren: () =>
          import('../tab2/diet.routing').then((m) => m.routes),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.routing').then((m) => m.routes),
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
