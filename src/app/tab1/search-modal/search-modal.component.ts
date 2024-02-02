import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ESearchModalTitle } from 'src/app/enums/search-modal-title.enum';
import { DietService } from 'src/app/service/diet.service';
import { WorkoutService } from 'src/app/service/workout.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SearchModalComponent implements OnInit {
  @Input() service: WorkoutService | DietService;
  @Input() title: string;
  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}
  public searchQuery = '';
  public name: string = '';

  public filteredSearchOptions: any[];
  public selectedMealTypeId: number;
  public servingSizeValue: number = 100;

  ngOnInit() {}

  performSearch() {
    if (this.service && this.searchQuery) {
      this.service.search(this.searchQuery, this.servingSizeValue.toString()).subscribe(response => {
        this.filteredSearchOptions = response;
      });
    }
  }

  select(option: any) {
    if (this.title === ESearchModalTitle.FOOD) {
      if (this.selectedMealTypeId) {
        option.meal_type_id = this.selectedMealTypeId;
      }
      if (this.servingSizeValue) {
        option.serving_weight = this.servingSizeValue;
        this.calculateNutritionWithServingSize(option);
      }
      if (!this.selectedMealTypeId) {
        return this.presentToast();
      }
    }
    this.modalCtrl.dismiss(option, 'select');
  }

  calculateNutritionWithServingSize(selectedFood) {
    selectedFood.protein = (selectedFood.protein * this.servingSizeValue) / 100;
    selectedFood.carbohydrates = (selectedFood.carbohydrates * this.servingSizeValue) / 100;
    selectedFood.fat = (selectedFood.fat * this.servingSizeValue) / 100;
    selectedFood.calories = (selectedFood.calories * this.servingSizeValue) / 100;
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onMealTypeChange(event: any) {
    const selectedValue = event.detail.value;
    console.log('Selected value:', selectedValue);
    this.selectedMealTypeId = selectedValue;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Meal Type must be selected in order to select food!',
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });

    await toast.present();
  }
}
