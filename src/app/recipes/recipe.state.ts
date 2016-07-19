import { RequestStatus } from '../shared/';
import { Recipe } from './';

export interface RecipeState {
  requestStatus: RequestStatus;
  errorMessage: string;
  recipe: Recipe;
}

export const initialRecipeState:RecipeState = {
  requestStatus: RequestStatus.None,
  errorMessage: null,
  recipe: null
};
