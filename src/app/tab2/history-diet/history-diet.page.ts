import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DietService } from 'src/app/service/diet.service';
import { DailyDietDetails } from 'src/app/components/daily-diet-details/daily-diet-details.component';
import { MealCardComponent } from 'src/app/components/meal-card/meal-card.component';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';

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
    DailyDietDetails,
    MealCardComponent,
    BackBtnComponent,
  ],
})
export class HistoryDietPage implements OnInit {
  constructor(private dietService: DietService) {}
  selectedDateControl: FormControl = new FormControl();
  availableDates: Date[] = [];
  selectedDiet: any;
  public foodList: {
    [key: number]: {
      name: string;
      calories: string | null;
      meal_type_id: number;
      protein;
      carbohydrates;
      fat;
      serving_weight: any;
    }[];
  } = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

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
      this.setFoodList(latestDiet.foods);
    });
  }

  setAvailableDates(diets) {
    diets.map(diet => {
      this.availableDates.push(new Date(diet.created_at));
    });
  }

  setFoodList(foodItems) {
    this.foodList = foodItems.reduce((result, foodItem) => {
      const { meal_type_id } = foodItem;

      // Create an empty array if the key doesn't exist in the result
      if (!result[meal_type_id]) {
        result[meal_type_id] = [];
      }

      // Push the food item into the corresponding array
      result[meal_type_id].push({
        name: foodItem.name,
        calories: foodItem.calories,
        meal_type_id: foodItem.meal_type_id,
        protein: foodItem.protein,
        carbohydrates: foodItem.carbohydrates,
        fat: foodItem.fat,
        serving_weight: foodItem.serving_weight,
      });

      return result;
    }, {});
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
