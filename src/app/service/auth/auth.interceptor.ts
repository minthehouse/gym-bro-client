import { AuthService } from './auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ServerType } from 'src/app/enums/server-type.enum';
import { environment } from 'src/environments/environment';

export const IS_AUTH_ENABLED = new HttpContextToken<boolean>(() => true);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (environment.serverType === ServerType.EXPRESS) {
      const { user } = this.store.snapshot();
      const { token } = this.store.snapshot();

      if (user && token.token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        return next.handle(cloned);
      }
      return next.handle(req);
    } else if (environment.serverType === ServerType.RAILS) {
      if (req.context.get(IS_AUTH_ENABLED) === false) {
        return next.handle(req);
      } else {
        const authReq = req.clone({ ...this.authService.options });
        return next.handle(authReq);
      }
    }
  }
}
