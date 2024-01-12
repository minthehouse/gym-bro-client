import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { buildAuthHeaders } from '../utils/auth-utils';
import { SetWorkouts } from 'state/workout.actions';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getWorkouts(): Observable<any> {
    const { user } = this.store.snapshot();

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts`).pipe(
      map(workouts => {
        this.store.dispatch(new SetWorkouts(workouts));
      }),
    );
  }

  getById(workoutId: string) {
    return this.http.get<any>(`${this.apiUrl}/workout/${workoutId}`);
  }

  finishWorkout(workoutData: any): any {
    const { user } = this.store.snapshot();
    const exercises_attributes = this.extractValuesFromHashMap(workoutData);
    const payload = {
      workout: {
        user_id: user.id,
        exercises_attributes,
      },
    };

    return this.http.post(`${this.apiUrl}/workout`, payload).pipe();
  }

  private extractValuesFromHashMap(originalData): any[] {
    const transformedData = ([] as any[]).concat(...Object.values(originalData));
    return transformedData;
  }

  search(search_param: string) {
    return this.http.get<any>(`${this.apiUrl}/exercise_types/search`, { params: { search_param: search_param } });
  }

  getPreviousWorkout(currentWorkoutId) {
    const { user } = this.store.snapshot();
    const headers = new HttpHeaders(buildAuthHeaders());

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts/${currentWorkoutId}/previous_workout`, {
      headers,
    });
  }

  getNextWorkout(currentWorkoutId) {
    const { user } = this.store.snapshot();
    const headers = new HttpHeaders(buildAuthHeaders());

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts/${currentWorkoutId}/next_workout`, {
      headers,
    });
  }
}
