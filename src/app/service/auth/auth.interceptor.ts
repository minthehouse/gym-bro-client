import { AuthService } from './auth.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const IS_AUTH_ENABLED = new HttpContextToken<boolean>(() => true);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.context.get(IS_AUTH_ENABLED) === false) {
      return next.handle(req);
    } else {
      const authReq = req.clone({ ...this.authService.options });
      return next.handle(authReq);
    }
  }
}
