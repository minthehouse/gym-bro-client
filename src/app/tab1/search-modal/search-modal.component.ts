import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchModalComponent implements OnInit {
  @Input() searchOptions: any = [
    {
      id: 1,
      name: 'Bench Press',
      muscle_group: 'Chest',
      imageSrc: 'https://i.pravatar.cc/300?u=b',
    },
    {
      id: 2,
      name: 'Deadlift',
      muscle_group: 'Back',
      imageSrc: 'https://i.pravatar.cc/300?u=a',
    },
    {
      id: 3,
      name: 'Squat',
      muscle_group: 'Legs',
      imageSrc: 'https://i.pravatar.cc/300?u=d',
    },
    {
      id: 4,
      name: 'Overhead Press',
      muscle_group: 'Shoulder',
      imageSrc: 'https://i.pravatar.cc/300?u=e',
    },
  ];
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();
  constructor(private exerciseService: ExerciseService) {}
  public searchQuery = '';
  private searchQueryChanged: Subject<string> = new Subject<string>();

  public filteredSearchOptions = [...this.searchOptions];

  ngOnInit() {
    console.log('hit modal');

    // this.exerciseService.getExerciseTypes().subscribe();
    this.searchQueryChanged.subscribe(() => {
      this.filterExerciseOptions();
    });
  }

  performSearch() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  filterExerciseOptions() {
    const query = this.searchQuery.toLowerCase();

    this.filteredSearchOptions = this.searchOptions.filter(
      (option: any) => option.name.toLowerCase().includes(query) || option.muscle_group.toLowerCase().includes(query),
    );
  }

  select(option: any) {
    this.selectedOption.emit({
      id: option.id,
      name: option.name,
    });
  }
}
