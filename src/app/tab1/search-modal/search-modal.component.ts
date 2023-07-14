import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
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

  ngOnInit() {}

  performSearch() {
    if (this.service) {
      this.service.search(this.searchQuery).subscribe(response => {
        this.filteredSearchOptions = response;
      });
    }
  }

  select(option: any) {
    this.modalCtrl.dismiss(option, 'select');
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
