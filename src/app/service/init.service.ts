import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, Observable, of } from 'rxjs';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private store: Store, private workoutService: WorkoutService) {}

  load(force = false): Observable<any> {
    const { workouts } = this.store.snapshot();
    const calls: Partial<any> = {};
    calls.empty = of(true);

    if (!workouts.list) {
      calls.types = this.workoutService.getWorkouts();
    }

    return forkJoin(calls);
  }
}
