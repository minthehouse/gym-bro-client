import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';

@Component({
  selector: 'app-track-diet',
  templateUrl: './track-diet.page.html',
  styleUrls: ['./track-diet.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    DailyCaloriesIntakeComponent,
  ],
})
export class TrackDietPage implements OnInit {
  constructor() {}

  public foodItems: {
    [key: number]: {
      name: string;
      kcal: string;
      meal_type_id: number;
    }[];
  } = {
    1: [
      {
        name: 'chicken',
        kcal: '240',
        meal_type_id: 1,
      },
    ],
    2: [
      {
        name: 'chicken',
        kcal: '240',
        meal_type_id: 2,
      },
    ],
    3: [
      {
        name: 'chicken',
        kcal: '240',
        meal_type_id: 3,
      },
    ],
  };

  ngOnInit() {}

  openAddFoodModal() {
    console.log('hit add food');
  }

  // Define the method to get meal type name based on ID
  public getMealTypeName(mealTypeId: number): string {
    switch (mealTypeId) {
      case 1:
        return 'Breakfast';
      case 2:
        return 'Lunch';
      case 3:
        return 'Dinner';
      default:
        return '';
    }
  }

  public getMealTypeIds(): number[] {
    return Object.keys(this.foodItems).map(Number);
  }

  public hasFoodItems(mealTypeId: number): boolean {
    return (
      !!this.foodItems[mealTypeId] && this.foodItems[mealTypeId].length > 0
    );
  }
}
