import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from 'redux';
import { RecipeState } from './';

@Injectable()
export class RecipeService {

  constructor(private http:Http) {


  }


  reducer(state:RecipeState, action:Action): RecipeState{
    return state;
  }

}
