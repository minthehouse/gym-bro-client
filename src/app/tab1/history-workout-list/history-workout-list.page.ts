import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackBtnComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-history-workout-list',
  templateUrl: './history-workout-list.page.html',
  styleUrls: ['./history-workout-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackBtnComponent],
})
export class HistoryWorkoutListPage implements OnInit {
  @Select(state => state.workouts.list) workoutList$: Observable<any>;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(selectedWorkout) {
    this.router.navigate([`tabs/workout/${selectedWorkout.id}/details`]);
  }
}
