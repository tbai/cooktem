import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'recipe-list-item',
  templateUrl: `

  `
})
export class RecipeListItemComponent implements OnInit {

  @Input()
  recipe: any;

  constructor() { }

  ngOnInit() { }

}
