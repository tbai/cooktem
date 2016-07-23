import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from 'redux';

import { AppStore } from '../app.store';
import { RequestStatus } from '../shared/';
import { SearchAction, SearchState, searchSuccess } from './';
import * as SearchActions from './search.actions';

@Injectable()
export class SearchService {

  constructor(
    private http:Http,
    // @Inject(forwardRef(() => AppStore)) private appStore:AppStore
    private appStore:AppStore
  ) {

  }

  searchRequest(query:string) : void {
    this.http.get("recipes.json")
        .map(response => response.json())
        .subscribe(recipes => {
          setTimeout(()=>{
            this.appStore.dispatch(searchSuccess(recipes));
          }, 500);
        });
  }


  reducer(state:SearchState, action:Action) : SearchState {

    switch (action.type) {
      case SearchActions.SEARCH_REQUEST:
        this.searchRequest((<SearchAction>action).query);

        return Object.assign({}, state, {
          requestStatus: RequestStatus.InProgress,
          errorMessage: null,
          query: (<SearchAction>action).query,
          recipes:[]
        });

      case SearchActions.SEARCH_SUCCESS:
        return Object.assign({}, state, {
          requestStatus: RequestStatus.Success,
          errorMessage: null,
          recipes:(<SearchAction>action).recipes
        });

      case SearchActions.SEARCH_FAILURE:
        return Object.assign({}, state, {
          requestStatus: RequestStatus.Failure,
          errorMessage: (<SearchAction>action).errorMessage
        });

      default:
        return state;
    }

  }

}
