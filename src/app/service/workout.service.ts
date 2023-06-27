import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workouts`);
  }

  finishWorkout(workoutData: any): any {
    const payload = {
      workout: {
        user_id: 1,
        start_at: '2023-06-22 10:00',
        end_at: '2023-06-22 11:00',
        duration_in_minutes: 60,
        exercises_attributes: [
          {
            set_number: 1,
            rep: 15,
            weight: 180,
            exercise_type_id: 1,
          },
          {
            set_number: 2,
            rep: 12,
            weight: 180,
            exercise_type_id: 1,
          },
          {
            set_number: 3,
            rep: 5,
            weight: 180,
            exercise_type_id: 1,
          },
          {
            set_number: 1,
            rep: 8,
            weight: 180,
            exercise_type_id: 2,
          },
          {
            set_number: 2,
            rep: 8,
            weight: 180,
            exercise_type_id: 2,
          },
          {
            set_number: 3,
            rep: 8,
            weight: 180,
            exercise_type_id: 2,
          },
        ],
      },
    };

    return this.http.post(`${this.apiUrl}/workout`, payload);

    // return this.getCSRFToken().pipe(
    //   switchMap((csrfToken: any) => {
    //     // Include CSRF token in the request headers
    //     const headers = new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'X-CSRF-Token': csrfToken.token, // Replace 'token' with the actual property name that holds the CSRF token
    //     });

    //     // Send the request with the CSRF token in the headers
    //     return this.http.post(`${this.apiUrl}/workout`, payload, { headers });
    //   })
    // );
  }

  // Other methods...

  getCSRFToken() {
    return this.http.get<any>(`${this.apiUrl}/csrf-token`);
  }
}
