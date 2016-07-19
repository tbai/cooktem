
import { Store, Action, createStore, applyMiddleware, Unsubscribe, Reducer } from 'redux';
import { AppState, initialState } from './';

import { Injectable, Inject } from '@angular/core';
import { RecipeService } from './recipes/';
import { SearchService } from './search/';

@Injectable()
class AppStore implements Store<AppState> {
  private store:Store<AppState>;

  constructor(private searchService:SearchService, private recipeService:RecipeService){
    this.store = createStore(this.rootReducer, initialState);
  }

  private rootReducer(state:AppState, action:Action){
    return {
      search: this.searchService.reducer(state.search, action),
      selectedRecipe: this.recipeService.reducer(state.selectedRecipe, action)
    };
  }

  dispatch(action:Action) {
    return this.store.dispatch(action);
  }

  getState(): AppState {
    return this.store.getState();
  }

  subscribe(listener: () => void) : Unsubscribe {
    return this.store.subscribe(listener);
  }

  replaceReducer(nextReducer: Reducer<AppState>): void {
    this.store.replaceReducer(nextReducer);
  }

}
