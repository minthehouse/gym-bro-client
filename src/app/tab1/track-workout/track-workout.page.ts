import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, SearchModalComponent],
})
export class TrackWorkoutPage implements OnInit {
  selectedIcons: { [key: string]: boolean }[] = [];
  searchOptions: any = [
    {
      id: 1,
      name: 'Bench Press',
      muscle_group: 'Chest',
      imageSrc: 'https://i.pravatar.cc/300?u=b',
    },
    {
      id: 2,
      name: 'Deadlift',
      muscle_group: 'Back',
      imageSrc: 'https://i.pravatar.cc/300?u=a',
    },
    {
      id: 3,
      name: 'Squat',
      muscle_group: 'Legs',
      imageSrc: 'https://i.pravatar.cc/300?u=d',
    },
    {
      id: 4,
      name: 'Overhead Press',
      muscle_group: 'Shoulder',
      imageSrc: 'https://i.pravatar.cc/300?u=e',
    },
  ];
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

  constructor(private workoutService: WorkoutService, public modalController: ModalController) {}
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

  selectedExerciseHandler(selectedExerciseType: any) {
    if (!this.getObjectKeys(this.workoutLists).includes(selectedExerciseType.id)) {
      this.addExerciseTable(selectedExerciseType);
    }
  }

  addExerciseTable(selectedExerciseType: any) {
    this.workoutLists[selectedExerciseType.id] = [
      {
        set: 1,
        weight: '',
        reps: '',
        exercise_type_id: selectedExerciseType.id,
        exercise_name: selectedExerciseType.name,
      },
    ];
  }

  getObjectKeys(obj: any): number[] {
    return Object.keys(obj).map(Number);
  }

  finish() {
    this.workoutService.finishWorkout(this.workoutLists).subscribe((res: any) => {});
  }

  completeSet(index: number, listIndex: number): void {
    const key = listIndex.toString();
    if (!this.selectedIcons[listIndex]) {
      this.selectedIcons[listIndex] = {};
    }
    this.selectedIcons[listIndex][index.toString()] = true;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
    });

    modal.onDidDismiss().then(data => {
      console.log('data', data);

      if (data.role === 'select') {
        // Handle the selected option here
        console.log(data.data); // data.data contains the selected option
      }
    });

    return await modal.present();
  }
}
