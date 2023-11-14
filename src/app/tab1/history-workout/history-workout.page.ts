import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';
import { DailyWorkoutComponent } from 'src/app/components/daily-workout/daily-workout.component';
import { ProgresssiveWorkoutComponent } from 'src/app/components/progressive-workout/progressive-workout.component';
import { WorkoutService } from 'src/app/service/workout.service';

@Component({
  selector: 'app-history-workout',
  templateUrl: './history-workout.page.html',
  styleUrls: ['./history-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, DailyWorkoutComponent, ProgresssiveWorkoutComponent, BackBtnComponent],
})
export class HistoryWorkoutPage implements OnInit {
  @Select(state => state.workouts.list) workouts$;
  constructor(private workoutService: WorkoutService) {}
  currentSegment: string = 'daily';
  workouts: any[];
  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }
}
