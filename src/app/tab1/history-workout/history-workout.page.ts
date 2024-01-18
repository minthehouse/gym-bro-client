import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';
import { DailyWorkoutComponent } from 'src/app/components/daily-workout/daily-workout.component';
import { ProgresssiveWorkoutComponent } from 'src/app/components/progressive-workout/progressive-workout.component';
import { WorkoutService } from 'src/app/service/workout.service';
import { TrackWorkoutPage } from '../track-workout/track-workout.page';

@Component({
  selector: 'app-history-workout',
  templateUrl: './history-workout.page.html',
  styleUrls: ['./history-workout.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    DailyWorkoutComponent,
    ProgresssiveWorkoutComponent,
    BackBtnComponent,
    TrackWorkoutPage,
  ],
})
export class HistoryWorkoutPage implements OnInit {
  constructor(private workoutService: WorkoutService, private activatedRoute: ActivatedRoute) {}
  currentSegment: string = 'daily';
  workoutLoad: any;
  ngOnInit() {
    const params = this.activatedRoute.snapshot.paramMap;
    const workoutId = params.get('id');

    this.workoutService.getById(workoutId).subscribe(workout => {
      console.log('workout in history', workout);
      this.workoutLoad = this.getWorkloadDetails(workout.exercises);
      console.log('hi', this.workoutLoad);
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }

  getWorkloadDetails(exercises: any[]) {
    return {
      totalWorkload: this.calculateTotalWorkload(exercises),
      maxWeightPerExercise: this.findHighestWeight(exercises),
    };
  }

  calculateTotalWorkload(exercises: any[]): { name: string; value: number }[] {
    const resultArray: { name: string; value: number }[] = [];

    exercises.forEach(exercise => {
      const exerciseName = exercise.ExerciseType.name;
      const volume = exercise.rep * exercise.weight;

      // Update or add entry in resultArray
      const existingEntry = resultArray.find(entry => entry.name === exerciseName);
      if (existingEntry) {
        existingEntry.value += volume;
      } else {
        resultArray.push({ name: exerciseName, value: volume });
      }
    });

    // Calculate total workload for the "Total" entry
    const totalValue = resultArray.reduce((sum, entry) => sum + entry.value, 0);
    resultArray.push({ name: 'Total', value: totalValue });

    return resultArray;
  }

  findHighestWeight(exercises: any[]): { name: string; value: number }[] {
    return exercises.reduce((resultArray, exercise) => {
      const exerciseName = exercise.ExerciseType.name;
      const weight = exercise.weight;

      const existingEntry = resultArray.find(entry => entry.name === exerciseName);

      if (!existingEntry) {
        resultArray.push({ name: exerciseName, value: weight });
      } else if (weight > existingEntry.value) {
        existingEntry.value = weight;
      }

      return resultArray;
    }, []);
  }
}
