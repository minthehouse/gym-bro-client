import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExerciseService } from 'src/app/service/exercise.service';
import { WorkoutService } from 'src/app/service/workout.service';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
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
    [key: string]: {
      set_number: number;
      weight: number;
      rep: number;
      exercise_type_id: number;
      completed?: boolean;
    }[];
  } = {};

  // example of workoutLists below:

  constructor(
    private workoutService: WorkoutService,
    public modalController: ModalController,
    private exerciseService: ExerciseService,
  ) {}
  exerciseTypeId: number = 1;

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe();
  }

  addRow(exerciseName: string) {
    const currentWorkout = this.workoutLists[exerciseName];

    this.workoutLists[exerciseName].push({
      set_number: currentWorkout.length + 1,
      weight: null,
      rep: null,
      exercise_type_id: this.findExerciseTypeId(exerciseName),
    });
  }

  selectedExerciseHandler(selectedExerciseType: any) {
    if (!this.getObjectKeys(this.workoutLists).includes(selectedExerciseType.id)) {
      this.addExerciseTable(selectedExerciseType);
    }
  }

  findExerciseTypeId(exerciseName: string): any {
    return this.searchOptions.find(exerciseType => exerciseType.name === exerciseName).id;
  }

  // addExerciseTable(selectedExerciseType: any) {
  //   this.workoutLists[selectedExerciseType.id] = [
  //     {
  //       set_number: 1,
  //       weight: '',
  //       rep: '',
  //       exercise_type_id: selectedExerciseType.id,
  //     },
  //   ];
  // }

  addExerciseTable(selectedExerciseType: any) {
    const exercise = {
      set_number: 1,
      weight: null,
      rep: null,
      exercise_type_id: selectedExerciseType.id,
    };

    if (!this.workoutLists.hasOwnProperty(selectedExerciseType.name)) {
      this.workoutLists[selectedExerciseType.name] = [];
    }

    this.workoutLists[selectedExerciseType.name].push(exercise);

    console.log('getObjectKeys workoutLists', this.workoutLists);
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
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
        this.addExerciseTable(data.data);
      }
    });

    return await modal.present();
  }
}
