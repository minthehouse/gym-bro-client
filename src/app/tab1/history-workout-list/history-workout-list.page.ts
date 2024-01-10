import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-workout-list',
  templateUrl: './history-workout-list.page.html',
  styleUrls: ['./history-workout-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HistoryWorkoutListPage implements OnInit {
  @Select(state => state.workouts.list) pastWorkouts$: Observable<any>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.pastWorkouts$.subscribe(pw => {
      console.log('pw', pw);

      // in this page, I need to display the Date for each workout.
      // can probably display duration using start_at, end_at?
      // can probably keep the calendar to show how many times user worked out.
    });
  }

  onClick(workout) {
    console.log('workout on onClick', workout);
    this.router.navigate([`tabs/workout/${workout.id}/details`]);
  }
}
