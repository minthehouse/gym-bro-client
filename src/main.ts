import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app/app.routing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({ swipeBackEnabled: false }),
      // IonicStorageModule.forRoot(),
      HttpClientModule,
      NgxsModule.forRoot(),
      NgxsStoragePluginModule.forRoot(),
    ),
    provideRouter(routes),
  ],
});
