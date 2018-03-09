import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { renderRoutes } from './helpers';

export default class Client {

  constructor(routes, reducers, initialState) {
    this.routes = routes;
    const rootReducer = combineReducers(reducers);
    const enhancer = composeWithDevTools(applyMiddleware(thunk));
    this.store = createStore(rootReducer, initialState, enhancer);
  }

  render(domElement) {
    ReactDOM.hydrate(
      <Provider store={this.store}>
        <Router>
          <div>{renderRoutes(this.routes)}</div>
        </Router>
      </Provider>
      , domElement);
  }
}