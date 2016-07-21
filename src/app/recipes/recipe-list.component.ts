import { Component, OnInit, Host, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppStore } from '../app.store';

import { searchRequest } from '../search/search.actions';


@Component({
  moduleId: module.id,
  selector: 'recipe-list',
  template: `
    <h4>Recipe List</h4>
    <ul>
      <li *ngFor="let recipe of recipeList">
        <p>{{recipe.name}}</p>
      </li>
    </ul>
  `
})
export class RecipeListComponent implements OnInit {

  private recipeList:any[];

  constructor(
    private route:ActivatedRoute,
    @Inject(forwardRef(() => AppStore)) private appStore: AppStore
  ) {

  }

  ngOnInit() {

    this.appStore.subscribe( ()=> {
      this.recipeList = this.appStore.getState().search.recipes;
    });

    this.route.params.subscribe(params => {
      let query = decodeURIComponent(params["query"]);
      if (query){
        this.appStore.dispatch(searchRequest(query));
      }
    });

  }


}
