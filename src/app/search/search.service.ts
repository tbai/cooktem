import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from 'redux';
import { SearchState } from './';

@Injectable()
export class SearchService {

  constructor(private http:Http) {

  }

  reducer(state:SearchState, action:Action): SearchState{
    return state;
  }

}
