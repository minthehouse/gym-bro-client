import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/service/workout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, tap } from 'rxjs/operators';
import { DietService } from 'src/app/service/diet.service';

@Component({
  selector: 'app-history-diet',
  templateUrl: './history-diet.page.html',
  styleUrls: ['./history-diet.page.scss'],
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
export class HistoryDietPage implements OnInit {
  constructor(private dietService: DietService) {}
  DietsList: any = [];
  selectedDateControl: FormControl = new FormControl();
  availableDates: Date[] = [];
  selectedDiet: any;

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
    this.dietService.getDiets().subscribe((diets: any) => {
      this.selectedDiet = diets[diets.length - 1];
      this.selectedDateControl.setValue(this.selectedDiet.end_at);
      this.DietsList = diets;
      this.setAvailableDates(diets);
      console.log('diets', diets);
    });
  }

  setAvailableDates(workouts) {
    workouts.map(workout => {
      this.availableDates.push(new Date(workout.end_at));
    });
  }

  onDateChange(event: any): void {
    const selectedDate = event.value; // Retrieve the selected date value

    // Find the workout with the same date as the selected date
    const selectedDiet = this.DietsList.find((workout: any) =>
      this.isSameDate(new Date(workout.start_at), selectedDate),
    );

    if (selectedDiet) {
      // Do something with the selected workout
      this.selectedDiet = selectedDiet;
      console.log('Selected workout:', selectedDiet);
    } else {
      console.log('No workout found for the selected date');
    }
  }
  navigateToPreviousWorkout() {}

  navigateToNextWorkout() {}
}
