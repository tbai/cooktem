import { Action, ActionCreator } from 'redux';
import { Recipe } from '../recipes/';

export const SEARCH_REQUEST:string = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS:string = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE:string = 'SEARCH_FAILURE';

export interface SearchAction extends Action {
  type: string,
  query: string,
  errorMessage: string,
  recipes: Recipe[]
}

export const searchRequest:ActionCreator<SearchAction> = function(query:string){
  return {
    type: SEARCH_REQUEST,
    query: query,
    errorMessage:null,
    recipes: []
  };
}

export const searchSuccess:ActionCreator<SearchAction> = function(recipes:Recipe[]){
  return {
    type: SEARCH_SUCCESS,
    query: null,
    errorMessage:null,
    recipes: recipes
  };
}

export const searchFailure:ActionCreator<SearchAction> = function(query:string, errorMessage:string){
  return {
    type: SEARCH_FAILURE,
    query: query,
    errorMessage:errorMessage,
    recipes: []
  };
}
