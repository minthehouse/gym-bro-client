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

  save(foodData) {
    const payload = this.mapFoods(foodData, 1);

    console.log('payload', payload);

    //   {
    //     "user_id": 1,
    //     "food_attributes": [
    //         {
    //             "name": "Beef, brisket",
    //             "kcal": 231,
    //             "protein": 29.4,
    //             "fat": 12,
    //             "carbohydrate": 0,
    //             "meal_type_id": 1
    //         },
    //         {
    //             "name": "Rice, white, cooked, glutinous",
    //             "kcal": 96,
    //             "protein": 2.01,
    //             "fat": 0.19,
    //             "carbohydrate": 21,
    //             "meal_type_id": 2
    //         },
    //         {
    //             "name": "Chicken breast, rotisserie, skin not eaten",
    //             "kcal": 144,
    //             "protein": 28,
    //             "fat": 3.57,
    //             "carbohydrate": 0,
    //             "meal_type_id": 2
    //         },
    //         {
    //             "name": "Pepper steak",
    //             "kcal": 145,
    //             "protein": 11.9,
    //             "fat": 9.12,
    //             "carbohydrate": 4.34,
    //             "meal_type_id": 3
    //         }
    //     ]
    // }
    return this.http.post(`${environment.apiUrl}/diet`, payload);
  }

  mapFoods(mockedFoods: { [key: number]: any[] }, userId: number): any {
    const mapped: any = {
      user_id: userId,
      foods_attributes: [],
    };

    Object.entries(mockedFoods).forEach(([mealTypeId, foods]) => {
      foods.forEach((food: any) => {
        const mappedFood = {
          ...food,
          meal_type_id: parseInt(mealTypeId),
        };
        mapped.foods_attributes.push(mappedFood);
      });
    });

    return mapped;
  }
}
