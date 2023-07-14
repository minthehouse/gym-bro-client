import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getExercises(): Observable<any> {
    const { user } = this.store.snapshot();
    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/exercises`);
  }

  getExerciseTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exercise_types`);
  }
}
