import {ResponseOptions, Request} from '@angular/http';
import {UrlMatcher} from '../shared/url-matcher';

export class FakeServerEndpoint {
  name: string;
  url: string;
  method: string;
  handler: (request: Request, ...urlParams: string[]) => ResponseOptions|Promise<ResponseOptions>;
}
