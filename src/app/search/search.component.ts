import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  moduleId: module.id,
  directives: [ROUTER_DIRECTIVES],
  selector: 'search',
  template: `
    <form>
      <p>
        <input class="input--large" type="text" placeholder="Ingredientes...">
      </p>

      <button class="bg--primary">Buscar Receitas</button>
    </form>

    <router-outlet></router-outlet>
  `
})
export class SearchComponent implements OnInit {
  private sub: Subscription;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      let query = params['query'];
    });

  }

}
