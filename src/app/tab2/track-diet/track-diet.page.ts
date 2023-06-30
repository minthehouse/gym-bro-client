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
  imports: [IonicModule, FormsModule, CommonModule, DailyCaloriesIntakeComponent],
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

  async presentModal(mealTypeId: number) {
    console.log('mealTypeId', mealTypeId);

    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        options: this.foodItems,
      },
    });

    modal.onDidDismiss().then(data => {
      console.log('data', data);

      if (data.role === 'select') {
        // Handle the selected option here
        console.log(data.data); // data.data contains the selected option
      }
    });

    return await modal.present();
  }
}
