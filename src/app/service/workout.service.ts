import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { buildAuthHeaders } from '../utils/auth-utils';
import { SetWorkoutToEdit, SetWorkouts } from 'state/workout.actions';
import { transformToExerciseDictionary, trasnformToExerciseAttributes } from '../transformer/exercise.transformer';
import { IWorkout } from 'state/workout.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getWorkouts(): Observable<IWorkout[]> {
    const { user } = this.store.snapshot();

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/workouts`).pipe(
      map(workouts => {
        this.store.dispatch(new SetWorkouts(workouts));
        return workouts;
      }),
    );
  }

  getById(workoutId: string): Observable<IWorkout> {
    return this.http.get<any>(`${this.apiUrl}/workout/${workoutId}`).pipe(
      map(workout => {
        const parsedExercises = transformToExerciseDictionary(workout.exercises);
        this.store.dispatch(new SetWorkoutToEdit(parsedExercises));
        return workout;
      }),
    );
  }

  updateWorkout(workoutData: any, workoutId: string): Observable<IWorkout> {
    const { user, workouts } = this.store.snapshot();
    console.log('workouts', workouts);
    const exercises_attributes = trasnformToExerciseAttributes(workoutData);
    const payload = {
      workout: {
        user_id: user.id,
        exercises_attributes,
      },
    };

    return this.http.put<IWorkout>(`${this.apiUrl}/workout/${workoutId}`, payload);
  }

  finishWorkout(workoutData: any, workoutIdToEdit?: string): Observable<IWorkout> {
    const { user } = this.store.snapshot();
    const exercises_attributes = trasnformToExerciseAttributes(workoutData);
    const payload = {
      workout: {
        user_id: user.id,
        exercises_attributes,
      },
    };

    if (workoutIdToEdit) {
      return this.updateWorkout(workoutData, workoutIdToEdit);
    } else {
      return this.http.post<IWorkout>(`${this.apiUrl}/workout`, payload);
    }
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
