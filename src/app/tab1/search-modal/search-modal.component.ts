import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DietService } from 'src/app/service/diet.service';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchModalComponent implements OnInit {
  @Input() searchOptions: any;
  @Input() title: string;
  constructor(private dietService: DietService, private modalCtrl: ModalController) {}
  public searchQuery = '';
  private searchQueryChanged: Subject<string> = new Subject<string>();
  public name: string = '';

  public filteredSearchOptions: any[];

  ngOnInit() {
    this.filteredSearchOptions = [...this.searchOptions];
    // this.exerciseService.getExerciseTypes().subscribe();
    this.searchQueryChanged.subscribe(() => {
      this.filterOptions();
    });

    console.log('hit modal');
    console.log('hit searchOptions', this.searchOptions);
  }

  // performSearch() {
  //   this.searchQueryChanged.next(this.searchQuery);
  // }

  performSearch() {
    this.dietService.search(this.searchQuery).subscribe(response => {
      console.log('res', response);
      this.filteredSearchOptions = response;
    });
    // this.dietService.search(this.searchQuery).subscribe(response => {
    //   // Process the response and update the `filteredSearchOptions` accordingly
    //   // For example, if the response contains an array of options, you can assign it like this:
    //   console.log('response', response);
    //   this.filteredSearchOptions = response.foods;
    // });
  }

  filterOptions() {
    const query = this.searchQuery.toLowerCase();
    this.filteredSearchOptions = this.searchOptions.filter(
      (option: any) => option.name.toLowerCase().includes(query) || option.muscle_group.toLowerCase().includes(query),
    );
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
