import { Component, ViewEncapsulation } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { SearchComponent } from './search';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  providers: [HTTP_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, SearchComponent],
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {

}
