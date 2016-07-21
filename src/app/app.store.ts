
import { Store, Action, createStore, Unsubscribe, Reducer } from 'redux';
import { AppState, initialState } from './app.state';
import { Injectable } from '@angular/core';


@Injectable()
export class AppStore implements Store<AppState> {
  private store:Store<AppState>;

  constructor(
  ){
    this.store = createStore(this.uselessReducer, initialState);
  }

  // The appStore loads with a useless reducer without any references
  // to the services. The real reducer will be added later in
  // app.component->ngOnInit combining the reducers from our services.
  private uselessReducer<A extends Action>(state:AppState, action:A) : AppState {
    return state;
  }

  dispatch(action: Action): Action {
    return this.store.dispatch(action);
  }

  getState(): AppState {
    return this.store.getState();
  }

  subscribe(listener: () => void) : Unsubscribe {
    return this.store.subscribe(listener);
  }

  replaceReducer(nextReducer: Reducer<AppState>): void {
    this.store.replaceReducer(nextReducer);
  }

}
