import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

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

    return this.http.post(`${this.apiUrl}/workout`, payload);
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
    return this.http.get<any>(`${this.apiUrl}/workouts/search`, { params: { search_param } });
  }
}
