import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'search',
  template: `
    <form>
      <p>
        <input class="input--large" type="text" placeholder="Ingredientes...">
      </p>

      <button class="bg--primary">Buscar Receitas</button>
    </form>
  `
})
export class SearchComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
