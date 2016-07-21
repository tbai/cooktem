import { Component, ViewEncapsulation, OnInit, forwardRef, Inject } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { SearchService } from './search/';
import { RecipeService } from './recipes/';
import { AppStore } from './app.store';
import { createReducer } from './app.reducer';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    AppStore
    ,SearchService
    ,RecipeService
  ],
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private appStore:AppStore,
    private searchService:SearchService,
    private recipeService:RecipeService
  ){

  }

  ngOnInit(){
    // We need to add the app reducer here in order to avoid circular dependency
    // with the appStore and the reducer from the services.
    // This way the appStore loads with a useless reducer without any references
    // to the services.
    this.appStore.replaceReducer(createReducer(this.searchService, this.recipeService));
  }
}
