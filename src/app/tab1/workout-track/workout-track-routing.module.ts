import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutTrackPage } from './workout-track.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutTrackPageRoutingModule {}
