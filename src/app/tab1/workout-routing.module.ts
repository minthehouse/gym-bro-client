import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutTrackPage } from './workout-track/workout-track.page';
import { WorkoutPage } from './workout.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
    children: [
      {
        path: 'track',
        component: WorkoutTrackPage,
      },
    ],
  },
  {
    path: 'workout-track',
    loadChildren: () =>
      import('./workout-track/workout-track.module').then(
        (m) => m.WorkoutTrackPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPageRoutingModule {}
