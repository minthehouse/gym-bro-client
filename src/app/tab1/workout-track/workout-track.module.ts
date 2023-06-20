import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutTrackPageRoutingModule } from './workout-track-routing.module';

import { WorkoutTrackPage } from './workout-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutTrackPageRoutingModule
  ],
  declarations: [WorkoutTrackPage]
})
export class WorkoutTrackPageModule {}
