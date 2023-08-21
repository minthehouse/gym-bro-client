import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { MealCardComponent } from 'src/app/components/meal-card/meal-card.component';
import { ESearchModalTitle } from 'src/app/enums/search-modal-title.enum';
import { DietService } from 'src/app/service/diet.service';
import { SearchModalComponent } from 'src/app/tab1/search-modal/search-modal.component';

@Component({
  selector: 'app-track-diet',
  templateUrl: './track-diet.page.html',
  styleUrls: ['./track-diet.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MealCardComponent,
  ],
})
export class TrackDietPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private dietService: DietService,
    private toastController: ToastController,
  ) {}
  // selectedDateControl: FormControl = new FormControl();
  private existingDietId: number;
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

  ngOnInit() {
    const today = new Date().toISOString();

    this.dietService.getDietByDate(today).subscribe((diet: any) => {
      if (diet) {
        this.existingDietId = diet.id;
        diet.foods.forEach(food => {
          this.foodList[food.meal_type_id].push(food);
        });

        console.log('food list from top', this.foodList);
      } else {
        this.existingDietId = null;
      }
    });
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

    this.save(this.foodList);
  }

  save(foodData) {
    const saveObservable = this.existingDietId
      ? this.dietService.update(foodData, this.existingDietId)
      : this.dietService.save(foodData);

    saveObservable.subscribe((response: any) => {
      if (response) {
        this.presentToast();
        this.existingDietId = response.id;
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your food log is successfully added!',
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }
}
