import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetCurrentWorkout, SetWorkoutStartTime } from 'state/workout.actions';
import { buildAuthHeaders } from '../utils/auth-utils';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getWorkouts(): Observable<any> {
    const { user } = this.store.snapshot();

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts`);
  }

  finishWorkout(workoutData: any): any {
    const { user } = this.store.snapshot();
    const { workout } = this.store.snapshot();

    const exercises_attributes = this.extractValuesFromHashMap(workoutData);
    const payload = {
      workout: {
        user_id: user.id,
        start_at: workout.workoutStartTime,
        end_at: new Date(),
        exercises_attributes,
      },
    };

    return this.http.post(`${this.apiUrl}/workout`, payload).pipe(
      tap(() => {
        this.store.dispatch(new SetCurrentWorkout(null));
        this.store.dispatch(new SetWorkoutStartTime(null));
      }),
    );
  }

  extractValuesFromHashMap(hashMap: { [key: string]: any }): any[] {
    const values: any[] = [];

    for (const key in hashMap) {
      if (Object.prototype.hasOwnProperty.call(hashMap, key)) {
        values.push(...hashMap[key]);
      }
    }

    return values;
  }

  search(search_param: string) {
    return this.http.get<any>(`${this.apiUrl}/exercise_types/search`, { params: { search_param: search_param } });
  }

  getPreviousWorkout(currentWorkoutId) {
    console.log('local', JSON.parse(localStorage.getItem('@@STATE')).userToken);

    const { user } = this.store.snapshot();
    const headers = new HttpHeaders(buildAuthHeaders());
    console.log('headers', headers);

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts/${currentWorkoutId}/previous_workout`, {
      headers,
    });
  }
}
