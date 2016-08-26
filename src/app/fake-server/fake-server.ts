
import {Injectable} from '@angular/core';

import {Response, ResponseOptions, Http, BaseRequestOptions, RequestMethod, Request} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {UrlMatcher} from '../shared/url-matcher';

import {FakeServerEndpoint} from './fake-server.endpoint';


@Injectable()
export class FakeServer {

  private _endpoints: {[key:string]:FakeServerEndpoint} = {};

  constructor(public _backend:MockBackend) {
    this.subscribeToConnections();
  }

  private subscribeToConnections(){

    this._backend.connections.subscribe(c => {

      let endpoint = this.findEndpoint(c.request.url, c.request.method);

      if (endpoint) {
        var endpointUrlMatcher = new UrlMatcher(endpoint.url);

        let responseOptionsDataOrPromise = endpoint.handler(c.request, ...endpointUrlMatcher.extractParameters(c.request.url));
        if (responseOptionsDataOrPromise instanceof Promise){
          // the result is a promise, lets use it
          responseOptionsDataOrPromise.then(
            responseOptionsData => {
              let responseOptions = new ResponseOptions(responseOptionsData);
              c.mockRespond(new Response(new ResponseOptions(responseOptions)));
            },
            error => {
              c.mockRespond(new Response(new ResponseOptions({status: 404})));
            }
          );
        } else {
          // the result of the handler is not a ResponseOptions object data
          let responseOptions = new ResponseOptions(responseOptionsDataOrPromise);
          c.mockRespond(new Response(new ResponseOptions(responseOptions)));
        }

      } else {
        // send a 404
        c.mockRespond(new Response(new ResponseOptions({status: 404})));
      }

    });
  }

  private findEndpoint(url:string, method:RequestMethod){
    let endpoint, urlMatcher;
    for (let name in this._endpoints){
      endpoint = this._endpoints[name];

      urlMatcher = new UrlMatcher(endpoint.url);
      if (urlMatcher.test(url) && RequestMethod[method].toUpperCase() === endpoint.method.toUpperCase() ){
        return endpoint;
      }
    }

    return null;
  }

  public addEndpoint(endpointOptions:FakeServerEndpoint ){
    this._endpoints[endpointOptions.name] = endpointOptions;
  }

  public removeEndpoint(name){
    if (this._endpoints[name]){
      delete this._endpoints[name];
    }
  }

  public removeAllEndpoints(){
    this._endpoints = {};
  }

}
