import { Action, ActionCreator } from 'redux';
import { Recipe } from './';

export const RECIPE_REQUEST:string = 'RECIPE_REQUEST';
export const RECIPE_SUCCESS:string = 'RECIPE_SUCCESS';
export const RECIPE_FAILURE:string = 'RECIPE_FAILURE';

export interface RecipeAction extends Action {
  type: string,
  id: string,
  errorMessage: string,
  recipe: Recipe
}

export const recipeRequest:ActionCreator<RecipeAction> = function(id:string, partialRecipe:Recipe = null){
  return {
    type: RECIPE_REQUEST,
    id: id,
    errorMessage:null,
    recipe: partialRecipe
  };
}

export const recipeRequestSuccess:ActionCreator<RecipeAction> = function(recipe:Recipe){
  return {
    type: RECIPE_SUCCESS,
    id: recipe.id,
    errorMessage:null,
    recipe: recipe
  };
}

export const recipeRequestFailure:ActionCreator<RecipeAction> = function(id:string, errorMessage:string){
  return {
    type: RECIPE_FAILURE,
    id: id,
    errorMessage:errorMessage,
    recipe:null
  };
}
