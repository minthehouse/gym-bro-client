import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { WorkoutService } from 'src/app/service/workout.service';
import { SetCurrentWorkout } from 'state/workout.actions';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { ESearchModalTitle } from 'src/app/enums/search-modal-title.enum';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.page.html',
  styleUrls: ['./track-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule, BackBtnComponent],
})
export class TrackWorkoutPage implements OnInit {
  @Select(state => state.workouts.current) currentWorkout$: Observable<any>;
  workoutForm: FormGroup;

  constructor(
    private workoutService: WorkoutService,
    public modalController: ModalController,
    private store: Store,
    private router: Router,
    private fb: FormBuilder, // Add this line
  ) {
    this.workoutForm = this.fb.group({});
  }

  getSets(exerciseName: string): FormArray {
    const exerciseControl = this.workoutForm.get(exerciseName);
    return exerciseControl instanceof FormArray ? exerciseControl : new FormArray([]);
  }

  ngOnInit() {
    this.currentWorkout$.subscribe(currentWorkout => {
      if (currentWorkout) {
        for (const exerciseName in currentWorkout) {
          const sets = currentWorkout[exerciseName];
          const formArray = this.createFormArrayFromSets(sets);

          if (this.workoutForm.get(exerciseName)) {
            this.updateExistingExerciseControl(exerciseName, formArray);
          } else {
            this.addNewExerciseControl(exerciseName, formArray);
          }
        }
      }
    });
  }

  createFormArrayFromSets(sets: any[]): FormArray {
    return this.fb.array(sets.map(set => this.fb.group(set)));
  }

  updateExistingExerciseControl(exerciseName: string, formArray: FormArray): void {
    const exerciseControl = this.workoutForm.get(exerciseName) as FormArray;
    exerciseControl.clear();
    formArray.controls.forEach(control => exerciseControl.push(control));
  }

  addNewExerciseControl(exerciseName: string, formArray: FormArray): void {
    this.workoutForm.addControl(exerciseName, formArray);
  }

  addSet(exerciseName: string) {
    const exerciseControl = this.workoutForm.get(exerciseName) as FormArray;

    if (exerciseControl) {
      const newSetFormGroup = this.fb.group({
        set_number: exerciseControl.length + 1,
        weight: null,
        rep: null,
        exercise_type_id: exerciseControl.value[0].exercise_type_id,
      });

      exerciseControl.push(newSetFormGroup);

      this.store.dispatch(new SetCurrentWorkout(this.workoutForm.value));
    }
  }

  addExerciseTable(selectedExerciseType: any) {
    if (this.workoutForm?.get(selectedExerciseType.name)) {
      return;
    }

    const newSetFormArray = this.fb.array([
      this.fb.group({
        set_number: 1,
        weight: null,
        rep: null,
        exercise_type_id: selectedExerciseType.id,
      }),
    ]);

    this.workoutForm?.addControl(selectedExerciseType.name, newSetFormArray);
    this.store.dispatch(new SetCurrentWorkout(this.workoutForm.value));
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj);
  }

  finish(ngForm) {
    if (ngForm.form.valid) {
      this.workoutService.finishWorkout(ngForm.value).subscribe(response => {
        if (response) {
          this.router.navigate(['/tabs/workout/success']);
        }
      });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        service: this.workoutService,
        title: ESearchModalTitle.WORKOUT,
      },
    });

    modal.onDidDismiss().then(data => {
      if (data.role === 'select') {
        this.addExerciseTable(data.data);
      }
    });

    return await modal.present();
  }

  getNestedControl(exerciseName: string, index: number, controlName: string): FormControl | null {
    const exerciseGroup = this.workoutForm.get(exerciseName) as FormArray;
    const setFormGroup = exerciseGroup.at(index) as FormGroup;
    return setFormGroup ? (setFormGroup.get(controlName) as FormControl) : null;
  }

  removeSet(exerciseName: string, index: number) {
    const exerciseControl = this.workoutForm.get(exerciseName) as FormArray;

    if (exerciseControl.value.length === 1) {
      this.removeExerciseFromForm(exerciseName);
    }

    if (exerciseControl && exerciseControl.length > index) {
      exerciseControl.removeAt(index);
      this.renumberSetNumbers(exerciseControl);
    }

    this.store.dispatch(new SetCurrentWorkout(this.workoutForm.value));
  }

  renumberSetNumbers(exerciseControl: FormArray) {
    for (let i = 0; i < exerciseControl.length; i++) {
      const setFormGroup = exerciseControl.at(i) as FormGroup;
      setFormGroup.get('set_number')?.setValue(i + 1);
    }
  }

  private removeExerciseFromForm(exerciseName: string) {
    this.workoutForm.removeControl(exerciseName);
    console.log('workoutForm hi hi', this.workoutForm);
  }
}
