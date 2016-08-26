
import { HTTP_PROVIDERS, Http, BaseRequestOptions } from '@angular/http';
import { ReflectiveInjector, provide } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { FakeServer } from './';

export let FAKE_SERVER_HTTP_PROVIDER = provide(Http, {
  useFactory: (backend, options) => {
    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
});


export let FAKE_SERVER_PROVIDERS = [FAKE_SERVER_HTTP_PROVIDER, MockBackend, BaseRequestOptions, FakeServer];
