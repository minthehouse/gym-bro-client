import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DietService } from 'src/app/service/diet.service';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';

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
    DailyCaloriesIntakeComponent,
  ],
})
export class HistoryDietPage implements OnInit {
  constructor(private dietService: DietService) {}
  selectedDateControl: FormControl = new FormControl();
  availableDates: Date[] = [];
  selectedDiet: any;

  dateFilter = (date: Date): boolean => {
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
      this.setAvailableDates(diets);
      const latestDiet = diets[diets.length - 1];
      this.selectedDiet = latestDiet;
      this.selectedDateControl.setValue(latestDiet.created_at);
    });
  }

  setAvailableDates(diets) {
    diets.map(diet => {
      this.availableDates.push(new Date(diet.created_at));
    });
  }

  onDateChange(event: any): void {
    const selectedDate = event?.value?.toISOString();

    if (selectedDate) {
      this.getDietByDate(selectedDate);
    }
  }

  private getDietByDate(dateInISOString) {
    this.dietService.getDietByDate(dateInISOString).subscribe((diet: any) => {
      if (diet) {
        this.selectedDiet = diet;
        this.selectedDateControl.setValue(diet.created_at);
      }
    });
  }
}
