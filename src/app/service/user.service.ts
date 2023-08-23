import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetUser } from 'state/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  update(id: number, userInfo: any) {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, userInfo).pipe(
      map(res => {
        if (res) {
          this.store.dispatch(new SetUser(res));
          return res;
        }
      }),
    );
  }
}
