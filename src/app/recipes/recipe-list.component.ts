import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'recipe-list',
  template: `
    <h4>Recipe List</h4>
    <ul>
      <li>
      </li>
    </ul>
  `
})
export class RecipeListComponent implements OnInit {

  private recipeList:any[];

  constructor() { }

  ngOnInit() { }


}
