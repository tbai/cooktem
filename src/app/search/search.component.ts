import { Component, OnInit, Inject, forwardRef } from '@angular/core';
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
export class SearchComponent implements OnInit {
  private sub: Subscription;


  formData:any;

  constructor(
    private router: Router,
    private route:  ActivatedRoute
  ) {
    this.formData = {query:""};
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.formData.query = params['query'];
    });

  }

  // searchClick($event, query:string) {
  searchClick($event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.formData.query){
      this.router.navigateByUrl(`/search/${ encodeURIComponent(this.formData.query) }`);
    }
  }

}
