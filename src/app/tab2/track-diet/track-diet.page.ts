import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { DailyCaloriesIntakeComponent } from 'src/app/components/daily-calories-intake/daily-calories-intake.component';
import { ESearchModalTitle } from 'src/app/enums/search-modal-title.enum';
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
  constructor(
    private router: Router,
    private modalController: ModalController,
    private dietService: DietService,
    private toastController: ToastController,
  ) {}
  searchOptions: any = [];
  isToastOpen = false;

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
    3: [],
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

  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      componentProps: {
        service: this.dietService,
        title: ESearchModalTitle.FOOD,
      },
    });

    modal.onDidDismiss().then(data => {
      if (data.role === 'select') {
        console.log(data.data); // data.data contains the selected option
        this.addFoodTable(data.data);
      }
    });

    return await modal.present();
  }

  addFoodTable(selectedFood: any) {
    const mealTypeId = selectedFood.meal_type_id;
    if (!this.foodList.hasOwnProperty(mealTypeId)) {
      this.foodList[mealTypeId] = [];
    }

    this.foodList = {
      ...this.foodList,
      [mealTypeId]: [...this.foodList[mealTypeId], selectedFood],
    };
  }

  save() {
    this.dietService.save(this.foodList).subscribe(response => {
      if (response) {
        this.router.navigate(['/tabs/diet/success']);
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your diet for the day is successfully saved!',
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }
}
