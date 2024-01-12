import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-progressive-workout',
  templateUrl: './progressive-workout.component.html',
  styleUrls: ['./progressive-workout.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
})
export class ProgresssiveWorkoutComponent implements OnInit {
  @Input() workout: any;

  constructor(private workoutService: WorkoutService) {}

  workoutLists: any = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  availableDates: Date[] = [];
  selectedWorkout: any;

  ngOnInit() {
    this.setDefaultRange();
  }

  private setDefaultRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // Set it to a week ago

    this.range.setValue({
      start: startDate,
      end: endDate,
    });
  }

  changeRange() {
    console.log('hit apply');
  }
}
