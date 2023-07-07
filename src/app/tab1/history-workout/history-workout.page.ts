import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-history-workout',
  templateUrl: './history-workout.page.html',
  styleUrls: ['./history-workout.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
})
export class HistoryWorkoutPage implements OnInit {
  @ViewChild(IonDatetime)
  dateToSearchFor = new FormControl(new Date());
  events: string[] = [];

  constructor(private workoutService: WorkoutService) {}
  selectedDate: Date = new Date(); // Set the initial selected date to today's date or any default date
  workoutLists: any = [this.selectedDate];

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(workouts => {
      console.log('workouts in history', workouts);
      this.workoutLists = workouts;
    });
  }

  generateDayValues(): number[] {
    const dayValues: number[] = [];
    for (const workout of this.workoutLists) {
      const startAt = new Date(workout.start_at);
      const day = startAt.getDate();
      if (!dayValues.includes(day)) {
        dayValues.push(day);
      }
    }
    console.log('day values', dayValues);

    return dayValues;
  }
}
