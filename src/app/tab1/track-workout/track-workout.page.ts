import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { WorkoutService } from 'src/app/service/workout.service';
import { SetCurrentWorkout, SetWorkoutStartTime } from 'state/workout.actions';
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
    [exerciseName: string]: {
      set_number: number;
      weight: number;
      rep: number;
      exercise_type_id: number;
      completed?: boolean;
    }[];
  } = {};

  constructor(private workoutService: WorkoutService, public modalController: ModalController, private store: Store) {}
  exerciseTypeId: number = 1;

  ngOnInit() {
    const currentWorkout = this.store.snapshot().workout?.current;
    if (currentWorkout) {
      this.workoutLists = currentWorkout;
    }
  }

  addSet(exerciseName: string) {
    const exerciseList = this.workoutLists[exerciseName];
    console.log('exerciseList', exerciseList);

    const newSet = {
      set_number: exerciseList.length + 1,
      weight: null,
      rep: null,
      exercise_type_id: exerciseList[0].exercise_type_id,
    };

    exerciseList.push(newSet);

    this.store.dispatch(new SetCurrentWorkout(this.workoutLists));
  }

  addExerciseTable(selectedExerciseType: any) {
    if (this.workoutLists.hasOwnProperty(selectedExerciseType.name)) {
      return;
    }

    const exercise = {
      set_number: 1,
      weight: null,
      rep: null,
      exercise_type_id: selectedExerciseType.id,
    };

    this.workoutLists[selectedExerciseType.name] = [exercise];

    this.store.dispatch(new SetCurrentWorkout(this.workoutLists));

    // Uncomment the code below if you need to set workout start time
    // const workout = this.store.selectSnapshot(state => state.workout);
    // if (!workout.startWorkout) {
    //   this.store.dispatch(new SetWorkoutStartTime(new Date()));
    // }
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  finish() {
    this.workoutService.finishWorkout(this.workoutLists).subscribe((res: any) => {
      this.store.dispatch(new SetCurrentWorkout(null));
      this.store.dispatch(new SetWorkoutStartTime(null));
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        service: this.workoutService,
        title: 'Select Exercise',
      },
    });

    modal.onDidDismiss().then(data => {
      if (data.role === 'select') {
        this.addExerciseTable(data.data);
      }
    });

    return await modal.present();
  }
}
