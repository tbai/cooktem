import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './recipe.model';



@Component({
  moduleId: module.id,
  selector: 'recipe-list-item',
  styleUrls: ['recipe-list-item.component.css'],

  template: `
    <div class="card" (click)=navigateToRecipe()>
      <div class="card-content">
        <span class="card-title bold">{{recipe.name}}</span>

        <p>{{recipe.preparation}}</p>
      </div>

      <div class="card-footer">
        Fonte: <a target="_blank" href="{{recipe.source}}">{{recipe.source}}</a>
      </div>
    </div>
  `
})
export class RecipeListItemComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor(private router:Router) {

  }

  ngOnInit() {

  }

  navigateToRecipe(){
    this.router.navigateByUrl(`/recipes/${this.recipe.id}`);
  }

}
