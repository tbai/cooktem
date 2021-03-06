import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent,
         environment,
         APP_ROUTER_PROVIDERS } from './app/';

import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy } // .../#/crisis-center/



]);

