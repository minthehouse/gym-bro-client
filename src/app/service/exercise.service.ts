import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExercises(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exercises`);
  }

  getExerciseTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exercise_types`);
  }
}
