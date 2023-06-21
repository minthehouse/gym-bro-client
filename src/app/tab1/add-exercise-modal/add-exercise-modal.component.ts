import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-exercise-modal',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AddExerciseModalComponent implements OnInit {
  @Output() selectedExercise: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  public searchQuery = '';
  private searchQueryChanged: Subject<string> = new Subject<string>();

  public exerciseOptions = [
    {
      type_id: 1,
      name: 'Bench Press',
      muscle_group: 'Chest',
      imageSrc: 'https://i.pravatar.cc/300?u=b',
    },
    {
      type_id: 2,
      name: 'Deadlift',
      muscle_group: 'Back',
      imageSrc: 'https://i.pravatar.cc/300?u=a',
    },
    {
      type_id: 3,
      name: 'Squat',
      muscle_group: 'Legs',
      imageSrc: 'https://i.pravatar.cc/300?u=d',
    },
    {
      type_id: 4,
      name: 'Overhead Press',
      muscle_group: 'Shoulder',
      imageSrc: 'https://i.pravatar.cc/300?u=e',
    },
  ];
  public filteredExerciseOptions = [...this.exerciseOptions];

  ngOnInit() {
    this.searchQueryChanged.subscribe(() => {
      this.filterExerciseOptions();
    });
  }

  performSearch() {
    this.searchQueryChanged.next(this.searchQuery);
  }

  filterExerciseOptions() {
    const query = this.searchQuery.toLowerCase();

    this.filteredExerciseOptions = this.exerciseOptions.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(query) ||
        exercise.muscle_group.toLowerCase().includes(query)
    );
  }

  selectExercise(exercise: any) {
    this.selectedExercise.emit({
      type_id: exercise.type_id,
      name: exercise.name,
    });
  }
}
