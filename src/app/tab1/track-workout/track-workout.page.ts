import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { AddExerciseModalComponent } from '../add-exercise-modal/add-exercise-modal.component';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, AddExerciseModalComponent],
})
export class TrackWorkoutPage implements OnInit {
  selectedIcons: { [key: string]: boolean }[] = [];

  public workoutLists: {
    [key: number]: {
      set: number;
      weight: string;
      reps: string;
      exercise_type_id: number;
      exercise_name: string;
      completed?: boolean;
    }[];
  } = {};

  // example of workoutLists below:

  constructor(private workoutService: WorkoutService) {}
  exerciseTypeId: number = 1;

  ngOnInit() {}

  addRow(exerciseTypeId: any) {
    const currentWorkout = this.workoutLists[exerciseTypeId];

    this.workoutLists[exerciseTypeId].push({
      set: currentWorkout.length + 1,
      weight: '',
      reps: '',
      exercise_type_id: exerciseTypeId,
      exercise_name: currentWorkout[0].exercise_name,
    });
  }

  selectedExerciseHandler(exercise: any) {
    if (!this.getObjectKeys(this.workoutLists).includes(exercise.type_id)) {
      this.addExerciseTable(exercise);
    }
  }
  addExerciseTable(exercise: any) {
    this.workoutLists[exercise.type_id] = [
      {
        set: 1,
        weight: '',
        reps: '',
        exercise_type_id: exercise.type_id,
        exercise_name: exercise.name,
      },
    ];
  }

  getObjectKeys(obj: any): number[] {
    return Object.keys(obj).map(Number);
  }

  finish() {
    this.workoutService
      .finishWorkout(this.workoutLists)
      .subscribe((res: any) => {
        console.log('res', res);
      });
    console.log('this.workoutLists in finish', this.workoutLists);
  }

  completeSet(index: number, listIndex: number): void {
    const key = listIndex.toString();
    if (!this.selectedIcons[listIndex]) {
      this.selectedIcons[listIndex] = {};
    }
    this.selectedIcons[listIndex][index.toString()] = true;
  }
}
