import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-history-workout',
  templateUrl: './history-workout.page.html',
  styleUrls: ['./history-workout.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class HistoryWorkoutPage implements OnInit {
  @ViewChild(IonDatetime)
  dateToSearchFor = new FormControl(new Date());
  events: string[] = [];

  constructor(private workoutService: WorkoutService) {}
  selectedDate: Date = new Date(); // Set the initial selected date to today's date or any default date
  workoutLists: any = [this.selectedDate];
  selectedDateControl: FormControl = new FormControl();

  availableDates: Date[] = [];
  selectedWorkout: any;
  // Filter function for the Datepicker

  dateFilter = (date: Date): boolean => {
    // Check if the date is included in the allowed dates array
    return this.availableDates.some(allowedDate => this.isSameDate(date, allowedDate));
  };

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  ngOnInit() {
    this.workoutService
      .getWorkouts()
      .pipe(
        filter(workouts => workouts),
        tap(workouts => {
          this.selectedWorkout = workouts[workouts.length - 2];
          this.workoutLists = workouts;
          this.setAvailableDates(workouts);
        }),
      )
      .subscribe();
  }

  setAvailableDates(workouts) {
    workouts.map(workout => {
      this.availableDates.push(new Date(workout.start_at));
    });
  }

  onDateChange(event: any): void {
    console.log('event in handler', event);

    const selectedDate = event.value; // Retrieve the selected date value

    // Find the workout with the same date as the selected date
    const selectedWorkout = this.workoutLists.find((workout: any) =>
      this.isSameDate(new Date(workout.start_at), selectedDate),
    );

    if (selectedWorkout) {
      // Do something with the selected workout
      this.selectedWorkout = selectedWorkout;
      console.log('Selected workout:', selectedWorkout);
    } else {
      console.log('No workout found for the selected date');
    }
  }
}
