import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getWorkouts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workouts`);
  }

  addFoodToUserDiet(foodData: any): any {
    const { user } = this.store.snapshot();
    console.log('user', user);
    console.log('foodData', foodData);

    return this.http.post(`${this.apiUrl}/diet`, foodData);
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

  // Other methods...

  getCSRFToken() {
    return this.http.get<any>(`${this.apiUrl}/csrf-token`);
  }

  search(search_param: string) {
    return this.http.get<any>(`${this.apiUrl}/foods/search`, { params: { search_param } });
  }
}
