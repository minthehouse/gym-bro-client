import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';
import { SearchModalComponent } from 'src/app/tab1/search-modal/search-modal.component';

@Component({
  selector: 'app-track-diet',
  templateUrl: './track-diet.page.html',
  styleUrls: ['./track-diet.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, DailyCaloriesIntakeComponent, SearchModalComponent],
})
export class TrackDietPage implements OnInit {
  constructor(private modalController: ModalController) {}

  public foodItems: {
    [key: number]: {
      name: string;
      kcal: string;
      meal_type_id: number;
    }[];
  } = {
    1: [
      // {
      //   name: 'Chicken',
      //   kcal: '240',
      //   meal_type_id: 1,
      // },
      // {
      //   name: 'Rice',
      //   kcal: '300',
      //   meal_type_id: 1,
      // },
    ],
    2: [
      // {
      //   name: 'chicken',
      //   kcal: '240',
      //   meal_type_id: 2,
      // },
      // {
      //   name: 'Rice',
      //   kcal: '300',
      //   meal_type_id: 1,
      // },
    ],
    3: [
      {
        name: 'chicken',
        kcal: '240',
        meal_type_id: 3,
      },
      {
        name: 'Rice',
        kcal: '300',
        meal_type_id: 1,
      },
    ],
  };

  ngOnInit() {}

  openAddFoodModal() {
    console.log('hit add food');
  }

  public getMealType(foodGroupKey: string): string {
    switch (foodGroupKey) {
      case '1':
        return 'Breakfast';
      case '2':
        return 'Lunch';
      case '3':
        return 'Dinner';
      default:
        return '';
    }
  }

  public hasFoodItems(mealTypeId: number): boolean {
    return !!this.foodItems[mealTypeId] && this.foodItems[mealTypeId].length > 0;
  }

  public setSelectedMealType(mealTypeId: number) {
    console.log('hit', mealTypeId);
  }

  public selectedFoodHandler(event: any) {
    console.log('event', event);

    console.log('selected food handler');
  }

  async openSearchModal() {
    
  }
}
