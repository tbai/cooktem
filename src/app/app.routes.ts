import { provideRouter, RouterConfig } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { RecipeComponent } from './recipes/recipe.component';
import { RecipeListComponent } from './recipes/recipe-list.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/search', terminal: true },
  { path: 'search', component: SearchComponent },
  { path: 'search', component: SearchComponent, children: [
      { path: ':query',  component: RecipeListComponent }
    ]
  },
  { path: 'recipes/:id', component: RecipeComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
