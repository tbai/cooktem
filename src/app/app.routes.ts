import { provideRouter, RouterConfig } from '@angular/router';

import { SearchComponent } from './search/';
import { RecipeListComponent } from './recipes/';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/search', terminal: true },
  { path: 'search', component: SearchComponent },
  { path: 'search', component: SearchComponent, children: [
      { path: ':query',  component: RecipeListComponent }
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
