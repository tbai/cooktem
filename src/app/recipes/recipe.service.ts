import { Injectable, forwardRef, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from 'redux';
import { AppStore } from '../app.store';
import { RecipeState, recipeRequestSuccess } from './';
import { RequestStatus } from '../shared/';
import { RecipeAction } from './recipe.actions';
import * as RecipeActions from './recipe.actions';

import 'rxjs/add/operator/find';

@Injectable()
export class RecipeService {

  constructor(
    private http:Http,
    // @Inject(forwardRef(() => AppStore))
    private appStore:AppStore
  ) {


  }

  reducer(state:RecipeState, action:Action): RecipeState{

    switch (action.type) {
      case RecipeActions.RECIPE_REQUEST:
        this.recipeRequest( (<RecipeAction>action).id );
        return Object.assign({}, state, {
          requestStatus: RequestStatus.InProgress,
          errorMessage: null,
          recipe:null
        });

      case RecipeActions.RECIPE_SUCCESS:
        return Object.assign({}, state, {
          requestStatus: RequestStatus.Success,
          errorMessage: null,
          recipe: (<RecipeAction>action).recipe
        });

      case RecipeActions.RECIPE_FAILURE:
        return Object.assign({}, state, {
          requestStatus: RequestStatus.Failure,
          errorMessage: (<RecipeAction>action).errorMessage,
          recipe: null
        });

      default:
        return state;
    }

  }


  recipeRequest(id:string) : void {
    this.http.get(`recipes.json`)
        .map(response => response.json())
        .subscribe( recipes => {
          let recipe = recipes.find(r => r.id === id);
          setTimeout(()=>{
            this.appStore.dispatch(recipeRequestSuccess(recipe));
          }, 500);
        })
  }

}
