import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
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
  constructor(private modalCtrl: ModalController) {}
  public searchQuery = '';
  public name: string = '';

  public filteredSearchOptions: any[];
  public selectedMealTypeId: number

  ngOnInit() {}

  performSearch() {
    if (this.service) {
      this.service.search(this.searchQuery).subscribe(response => {
        this.filteredSearchOptions = response;
      });
    }
  }

  select(option: any) {
    if(this.title === ESearchModalTitle.FOOD){
      // In future, I need to somehow make this.selectedMealTypeId required. 
      // if not, it will throw an error
      option.meal_type_id = this.selectedMealTypeId
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
    // You can perform any other actions based on the selected value here
  }
}
