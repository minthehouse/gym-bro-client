import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';
import { DietService } from 'src/app/service/diet.service';
import { SearchModalComponent } from 'src/app/tab1/search-modal/search-modal.component';

@Component({
  selector: 'app-track-diet',
  templateUrl: './track-diet.page.html',
  styleUrls: ['./track-diet.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, DailyCaloriesIntakeComponent],
})
export class TrackDietPage implements OnInit {
  constructor(private modalController: ModalController, private dietService: DietService) {}
  searchOptions: any = [
    {
      id: 1,
      name: 'Chicken Breast',
      kcal: 200,
      protein: 30,
      carb: 20,
      fat: 20,
      imageSrc: 'https://i.pravatar.cc/300?u=b',
    },
    {
      id: 2,
      name: 'Chicken Thigh',
      kcal: 200,
      protein: 30,
      carb: 20,
      fat: 20,
      imageSrc: 'https://i.pravatar.cc/300?u=a',
    },
    {
      id: 3,
      name: 'Beef Short Rib',
      kcal: 300,
      protein: 30,
      carb: 20,
      fat: 20,
      imageSrc: 'https://i.pravatar.cc/300?u=d',
    },
    {
      id: 4,
      name: 'Beef Brisket',
      kcal: 300,
      protein: 30,
      carb: 20,
      fat: 20,
      imageSrc: 'https://i.pravatar.cc/300?u=e',
    },
  ];
  public foodList: {
    [key: number]: {
      name: string;
      kcal: string;
      meal_type_id: number;
      protein;
      carb;
      fat;
    }[];
  } = {
    1: [],
    2: [],
    3: [
      {
        name: 'chicken',
        kcal: '240',
        meal_type_id: 3,
        protein: 30,
        carb: 20,
        fat: 20,
      },
      {
        name: 'Rice',
        kcal: '300',
        meal_type_id: 1,
        protein: 30,
        carb: 20,
        fat: 20,
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
    return !!this.foodList[mealTypeId] && this.foodList[mealTypeId].length > 0;
  }

  async presentModal(mealTypeId: number) {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        searchOptions: this.searchOptions,
        title: 'Select Food',
      },
    });

    modal.onDidDismiss().then(data => {
      if (data.role === 'select') {
        console.log(data.data); // data.data contains the selected option
        this.addFoodTable(mealTypeId, data.data);
      }
    });

    return await modal.present();
  }

  addFoodTable(mealTypeId, selectedFood: any) {
    if (!this.foodList.hasOwnProperty(mealTypeId)) {
      this.foodList[mealTypeId] = [];
    }

    this.foodList = {
      ...this.foodList,
      [mealTypeId]: [...this.foodList[mealTypeId], selectedFood],
    };

    const payload = { mealTypeId: selectedFood };

    this.dietService.addFoodToUserDiet(payload);
  }
}
