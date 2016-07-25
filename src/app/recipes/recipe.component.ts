import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import { Recipe } from './recipe.model';
import { recipeRequest } from './recipe.actions';
import { AppStore } from '../app.store';

@Component({
  moduleId: module.id,
  selector: 'recipe',
  directives: [ROUTER_DIRECTIVES],
  styles: [
    `
      .back-button .icon {
        margin-right: 8px;
        margin-left: -5px;
      }
    `
  ],
  template: `
    <div *ngIf="!recipe" class="spinner"></div>
    <div class="recipe" *ngIf="recipe">

      <a *ngIf="showBackButton()" (click)="goBack()" href="#" class="back-button button button--xsm button--pill bg--muted">
         <span class="icon">&#8630;</span> Voltar </a>

      <a *ngIf="!showBackButton()" [routerLink]="'/search'" class="back-button button button--xsm button--pill bg--muted">
         <span class="icon">&#8630;</span> Buscar Receitas </a>

      <h1>{{recipe.name}}</h1>
      <hr>

      <div row>
        <div column="4" class="recipe-image">
          <img width="100%" src="http://onebigphoto.com/uploads/2012/10/stunning-dolomites-mountains-italy.jpg">
        </div>

        <div column=8>
          <p>
            Fonte: <a target="_blank" href="{{recipe.source}}">{{recipe.source}}</a>
          </p>

          <h3>Ingredientes</h3>
          <ul>
            <li>Ovo</li>
            <li>Batata</li>
            <li>Cenoura</li>
          </ul>
          <h3>Preparação</h3>
          <p>{{recipe.preparation}}</p>


          <h3></h3>
        </div>

      </div>

      <div row>
        <div column=12>
          <p>{{recipe.preparation}}</p>
        </div>
      </div>


    </div>
  `
})
export class RecipeComponent implements OnInit {
  @Input()
  recipe:Recipe;


  constructor(
    private route : ActivatedRoute,
    private appStore : AppStore
  ) {

  }

  showBackButton(){
    return window.history.length > 2;
  }

  goBack(){
    window.history.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params["id"];
      this.appStore.dispatch(recipeRequest(id));
    });

    this.appStore.subscribe(()=> {
      this.recipe = this.appStore.getState().selectedRecipe.recipe;
    });
  }

}
