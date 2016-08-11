import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import dataFormatter from './reducers';
 
const AppState = Immutable.Record({
  error: false,
  facts: new Immutable.Map(),
  images: new Immutable.Map(),
  isRefreshing: 0,
  rows: new Immutable.Map(),
  unmatchedFacts: new Immutable.Set(),
  unmatchedImages: new Immutable.Set(),
});

const store = createStore(
  dataFormatter,
  new AppState(),
  applyMiddleware(thunkMiddleware)
);

export default store;
