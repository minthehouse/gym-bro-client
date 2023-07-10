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

  search(searchParam) {
    const params = new HttpParams()
      .set('query', searchParam)
      .set('api_key', environment.foodApiKey)
      .set('dataType', 'Survey (FNDDS)') // Replace with your actual API key
      .set('pageSize', 10);
    return this.http.get<any>(`https://api.nal.usda.gov/fdc/v1/foods/search`, { params });
  }
}
