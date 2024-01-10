import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-daily-workout',
  templateUrl: './daily-workout.component.html',
  styleUrls: ['./daily-workout.component.scss'],
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
export class DailyWorkoutComponent implements OnInit {
  @Input() workouts: any;
  constructor() {}
  entireWorkouts: any = [];
  selectedDateControl: FormControl = new FormControl();
  availableDates: Date[] = [];
  selectedWorkout: any;

  dateFilter = (date: Date): boolean => {
    if (!date) {
      return false;
    }

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
    if (this.workouts) {
      this.initializeWorkoutData(this.workouts);
    }
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    const selectedWorkout = this.entireWorkouts.find((workout: any) =>
      this.isSameDate(new Date(workout.created_at), selectedDate),
    );

    if (selectedWorkout) {
      this.selectedWorkout = selectedWorkout;
    }
  }

  private initializeWorkoutData(workouts: any[]) {
    if (workouts && workouts.length > 0) {
      this.selectedWorkout = workouts[workouts.length - 1];
      this.selectedDateControl.setValue(this.selectedWorkout.created_at);
      this.entireWorkouts = workouts;
      this.setAvailableDates(workouts);
    }
  }

  private setAvailableDates(workouts) {
    workouts.map(workout => {
      this.availableDates.push(new Date(workout.created_at));
    });
  }
}
