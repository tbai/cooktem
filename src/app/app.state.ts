
import { RecipeState, initialRecipeState } from './recipes/recipe.state';
import { SearchState, initialSearchState } from './search/search.state';


export interface AppState {
  search: SearchState;
  selectedRecipe: RecipeState;
}

export const initialState:AppState = {
  search: initialSearchState,
  selectedRecipe: initialRecipeState
};
