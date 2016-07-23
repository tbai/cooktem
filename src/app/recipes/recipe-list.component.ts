import {
  Component,
  OnInit,
  Host,
  Inject,
  forwardRef,

  // Animation
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AppStore } from '../app.store';
import { RequestStatus } from '../shared/';

import { searchRequest } from '../search/search.actions';

import { RecipeListItemComponent } from './recipe-list-item.component';


@Component({
  moduleId: module.id,
  selector: 'recipe-list',
  directives: [RecipeListItemComponent],
  template: `
    <div *ngIf="isLoading" class="spinner"></div>

    <div *ngIf="!isLoading" >
      <h4>Encontramos {{recipeList.length}} receita(s)</h4>
      <ul class="list--unstyled">
        <li *ngFor="let recipe of recipeList" @fadeIn="'in'">
          <div  >
            <recipe-list-item [recipe]="recipe" ></recipe-list-item>
          </div>
        </li>
      </ul>
    </div>

  `,
  animations: [
    trigger('fadeIn', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate("0.4s ease-out")
      ]),
      transition('* => void', [
        animate("0.4s ease-out", style({opacity: 1}))
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit {

  recipeList:any[];
  isLoading:boolean;

  constructor(
    private route:ActivatedRoute,

    @Inject(forwardRef(() => AppStore))
    private appStore: AppStore
  ) {
    this.isLoading = true;
  }

  ngOnInit() {

    this.appStore.subscribe( ()=> {
      this.recipeList = this.appStore.getState().search.recipes;
      this.isLoading = this.appStore.getState().search.requestStatus === RequestStatus.InProgress;
    });

    this.route.params.subscribe(params => {
      let query = decodeURIComponent(params["query"]);
      if (query){
        this.appStore.dispatch(searchRequest(query));
      }
    });

  }


}
