import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from '../service/workout.service';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.page.html',
  styleUrls: ['workout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class WorkoutPage implements OnInit {
  @Select(state => state.workouts.current) currentWorkout$: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe();
  }

  sendEvent(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}
