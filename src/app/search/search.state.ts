import { RequestStatus } from '../shared/';
import { Recipe } from '../recipes/';

export interface SearchState {
  requestStatus: RequestStatus;
  errorMessage: string;
  query: string;
  recipes: Recipe[];
}

export const initialSearchState:SearchState = {
  requestStatus: RequestStatus.None,
  errorMessage: null,
  query: null,
  recipes: []
}

