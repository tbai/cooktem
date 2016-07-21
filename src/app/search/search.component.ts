import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AppStore } from '../app.store';


@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  selector: 'search',
  template: `
    <form>
      <p>
        <input #query [(ngModel)]="formData.query"  class="input--large" type="text" placeholder="Ingredientes...">
      </p>

      <button class="bg--primary" (click)=searchClick($event)>Buscar Receitas</button>
    </form>

    <router-outlet></router-outlet>
  `
})
export class SearchComponent implements AfterViewChecked {
  private sub: Subscription;


  formData:{query:string};

  searchQuery:string;

  constructor(
    private router:   Router,
    private route:    ActivatedRoute,
    private appStore: AppStore
  ) {
    this.searchQuery = "";
    this.formData = {query:""};
  }

  ngAfterViewChecked(){
    this.appStore.subscribe( () => {
      this.formData.query = this.appStore.getState().search.query;
    });
  }

  searchClick($event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.formData.query){
      this.router.navigateByUrl(`/search/${ encodeURIComponent(this.formData.query) }`);
    }
  }

}
