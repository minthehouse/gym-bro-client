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

  completeProfile(values: any, credValues: any): Observable<any> {
    const { email, password } = credValues;
    const payload = { user_details: values, email, password };

    return this.http
      .post(`${environment.apiUrl}/auth/sign_in`, payload, {
        observe: 'response',
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      })
      .pipe(
        map(response => {
          return response;
        }),
      );
  }

  register(body: any): Observable<any> {
    const { config } = this.store.snapshot();
    const facility = config.mobile_health.facility;
    return this.http
      .post(`${environment.apiUrl}/auth`, body, {
        observe: 'response',
        context: new HttpContext().set(IS_AUTH_ENABLED, false),
      })
      .pipe(
        map((response: any) => {
          console.log('response', response);

          const user = response.body.data;
          // this.store.dispatch(new SetUser({ id: user.id, mobile_phone: user.mobile_phone }));
          // this.analyticsService.alias(user.id.toString());
          // this.analyticsService.trackEvent('Created Account');
          const { email, password } = body;
          // this.router.navigateByUrl('verify', {
          //   state: { email, password },
          // });
          return response;
        }),
      );
  }

  forgotPassword(body: any): Observable<any> {
    // this.analyticsService.trackEvent('Forgot Password');
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

    const user = response.user;
    const token = response.token.token;
    const client = response.token.client;
    const expiry = response.token.expiry;
    const uid = response.user.uid;
    this.store.dispatch(new SetUser({ user, token, client, expiry, uid }));
    this.storageService.saveSession(user, token, client, expiry, uid);
    return user;
  }

  private _navigate(url: any): void {
    this.router.navigate([url]);
  }

  private _reset(): void {
    // this.store.dispatch(new SetUser(null));
    // this.store.dispatch(new ResetPatientsState());
    // this.store.dispatch(new SetCurrentConsult(null));
    // this.store.dispatch(new ResetVisits());
    // this.store.dispatch(new SetCurrentVisit(null));
    // this.store.dispatch(new SetPatients(null));
    // this.store.dispatch(new SetCurrentMember(null));
    // localStorage.removeItem('@@STATE');
    this.storageService.deleteSession();
    // this.analyticsService.reset();
    // this.chatService.resetChatSession();
  }

  logoutAndNavigate(): Observable<any> {
    return this.logout().pipe(map(() => this._navigate('/landing')));
  }

  logout(): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/auth/sign_out`, {
        observe: 'response',
      })
      .pipe(
        map(response => {
          this._reset();
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
      this.store.dispatch(
        new SetUser({ user: user.user, token: user.token, client: user.client, expiry: user.expiry, uid: user.uid }),
      );
    }
    return user !== null && !this.isTokenExpired(user.expiry);
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
        'access-token': user.token,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      }),
    };
  }
}
