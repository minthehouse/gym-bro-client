import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ESearchModalTitle } from 'src/app/enums/search-modal-title.enum';
import { DietService } from 'src/app/service/diet.service';
import { WorkoutService } from 'src/app/service/workout.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchModalComponent implements OnInit {
  @Input() service: WorkoutService | DietService;
  @Input() title: string;
  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}
  public searchQuery = '';
  public name: string = '';

  public filteredSearchOptions: any[];
  public selectedMealTypeId: number;

  ngOnInit() {}

  performSearch() {
    if (this.service) {
      this.service.search(this.searchQuery).subscribe(response => {
        this.filteredSearchOptions = response;
      });
    }
  }

  select(option: any) {
    if (this.title === ESearchModalTitle.FOOD) {
      if (this.selectedMealTypeId) {
        option.meal_type_id = this.selectedMealTypeId;
      } else {
        return this.presentToast();
      }
    }
    this.modalCtrl.dismiss(option, 'select');
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
