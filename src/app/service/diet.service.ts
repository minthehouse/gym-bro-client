import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { buildAuthHeaders } from '../utils/auth-utils';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  search(search_param: string, serving_weight: string) {
    return this.http.get<any>(`${this.apiUrl}/foods/search`, { params: { search_param, serving_weight } });
  }

  searchByDate(date: string) {
    return this.http.get<any>(`${this.apiUrl}/diets/search`, { params: { date } });
  }

  getTheLatestDiet() {
    const { user } = this.store.snapshot();

    const headers = new HttpHeaders(buildAuthHeaders());

    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/diets/find_the_latest_diet`, {
      headers,
    });
  }

  // getDietByDate(date: string) {
  //   const { user } = this.store.snapshot();

  //   const headers = new HttpHeaders(buildAuthHeaders());

  //   return this.http.get<any>(`${this.apiUrl}/users/${user.id}/diets/find_by_date`, {
  //     params: { date: date },
  //   });
  // }

  update(foodData, dietId) {
    const payload = this.buildPayload(foodData);
    return this.http.put(`${environment.apiUrl}/diets/${dietId}`, payload);
  }

  save(foodData) {
    const payload = this.buildPayload(foodData);
    return this.http.post(`${environment.apiUrl}/diet`, payload);
  }

  getDiets() {
    const { user } = this.store.snapshot();
    return this.http.get<any>(`${this.apiUrl}/users/${user.id}/diets`);
  }

  private buildPayload(foodData: { [key: number]: any[] }): any {
    const { user } = this.store.snapshot();

    const mapped: any = {
      user_id: user.id,
      foods_attributes: [],
    };

    Object.entries(foodData).forEach(([mealTypeId, foods]) => {
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
