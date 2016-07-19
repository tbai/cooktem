
import { RecipeState, initialRecipeState } from './recipes/';
import { SearchState, initialSearchState } from './search/';


export interface AppState {
  search: SearchState;
  selectedRecipe: RecipeState;
}

export const initialState:AppState = {
  search: initialSearchState,
  selectedRecipe: initialRecipeState
};
