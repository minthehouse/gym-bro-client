import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app/app.routing';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { WorkoutState } from 'state/workout.state';
import { UserState } from 'state/user.state';
import { TokenState } from 'state/token.state';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({ swipeBackEnabled: false }),
      IonicStorageModule.forRoot(),
      HttpClientModule,
      NgxsModule.forRoot([UserState, TokenState, WorkoutState]),
      NgxsStoragePluginModule.forRoot(),
    ),
    provideRouter(routes),
    provideAnimations(),
  ],
});
