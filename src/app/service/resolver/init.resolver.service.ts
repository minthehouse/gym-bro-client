import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InitService } from '../init.service';

@Injectable({
  providedIn: 'root',
})
export class InitResolverService {
  constructor(private initService: InitService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.initService.load(route.data['force']);
  }
}
