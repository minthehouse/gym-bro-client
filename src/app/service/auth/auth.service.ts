import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetUser } from 'state/user.actions';
import { StorageService } from '../storage.service';
import { IS_AUTH_ENABLED } from './auth.interceptor';
import { buildAuthHeaders } from '../../utils/auth-utils';
import { SetCurrentWorkout, SetWorkoutStartTime } from 'state/workout.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private storageService: StorageService,
  ) {}

  login(values: any, redirect_to = 'tabs/workout'): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/sign_in`, values).pipe(
      map(response => {
        if (response) {
          this._saveUser(response);
          this._navigate(redirect_to);
          return response;
        }
      }),
    );
  }

  register(body: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/auth`, body, {
        observe: 'response',
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      })
      .pipe(
        map((response: any) => {
          console.log('response in regi', response);
          const user = response?.body?.data;
          this.store.dispatch(new SetUser(user));
          const { email, password } = body;
          this.router.navigateByUrl('goal', {
            state: { cred: { email, password } },
          });
          return response;
        }),
      );
  }

  forgotPassword(body: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/auth/password`,
      { ...body, redirect_url: '/reset-password' },
      {
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      },
    );
  }

  resetPassword(body: any): Observable<any> {
    // this.analyticsService.trackEvent('Reset Password');
    return this.http.put(`${environment.apiUrl}/auth/password`, body, {
      context: new HttpContext().set(IS_AUTH_ENABLED, false),
    });
  }

  changePassword(body: any): Observable<any> {
    // this.analyticsService.trackEvent('Change Password');
    return this.http.put(`${environment.apiUrl}/auth/password`, body);
  }

  resendConfirmation(body: any): Observable<any> {
    // this.analyticsService.trackEvent('Resend Confirmation');
    return this.http.post(`${environment.apiUrl}/auth/confirmation`, body, {
      context: new HttpContext().set(IS_AUTH_ENABLED, false),
    });
  }

  confirm(confirmation_token: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/auth/confirmation`, {
        params: { confirmation_token },
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => {
          // this.dialogService.setError(err);
          console.log(err);
          return err;
        }),
      );
  }

  unlock(unlock_token: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/auth/unlock`, {
        params: { unlock_token },
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      })
      .pipe(
        map(response => {
          // this.store.dispatch(new SetUserLockStatus(false));
          return response;
        }),
        catchError(err => {
          console.log(err);
          // this.dialogService.setError(err);
          return err;
        }),
      );
  }

  private _saveUser(response: any): any {
    console.log('response in save user', response);
    this.store.dispatch(new SetUser(response));

    this.storageService.saveSession(response.user, response.token);
    return response.user;
  }

  private _navigate(url: any): void {
    this.router.navigate([url]);
  }

  private _reset(): void {
    this.store.dispatch(new SetUser(null));
    this.store.dispatch(new SetCurrentWorkout(null));
    this.store.dispatch(new SetWorkoutStartTime(null));
    localStorage.removeItem('@@STATE');
    this.storageService.deleteSession();
  }

  logoutAndNavigate(): Observable<any> {
    return this.logout().pipe(map(() => this._navigate('/landing')));
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders(buildAuthHeaders());

    return this.http.delete(`${environment.apiUrl}/auth/sign_out`, { headers }).pipe(
      map(response => {
        return response;
      }),
      finalize(() => {
        this._reset();
      }),
    );
  }

  public async isLoggedIn(): Promise<boolean> {
    const user = await this.storageService.getSession();
    // TODO: rename params
    if (user) {
      console.log('user in isLoggedin', user);

      this.store.dispatch(new SetUser({ user: user.user, token: user.token }));
    }
    return user !== null && !this.isTokenExpired(user?.token?.expiry);
  }

  public isTokenExpired(expiry: any): boolean {
    if (!expiry) {
      return true;
    }
    return parseInt(expiry, 10) * 1000 < Date.now();
  }

  public get options(): any {
    const { user } = this.store.snapshot();

    return {
      headers: new HttpHeaders({
        'access-token': user.userToken.token,
        client: user.userToken.client,
        expiry: user.userToken.expiry,
        uid: user.uid,
      }),
    };
  }
}
