import { Action, Reducer } from 'redux';
import { AppState } from './app.state';

import { RecipeService } from './recipes/recipe.service';
import { SearchService } from './search/search.service';


export const createReducer = function (searchService:SearchService, recipeService:RecipeService) : Reducer<AppState>{

  return function <A extends Action>(state:AppState, action:A) : AppState {
    return {
      search: searchService.reducer(state.search, action),
      selectedRecipe: recipeService.reducer(state.selectedRecipe, action)
    };
  };

};

