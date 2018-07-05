import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { renderRoutes } from './helpers';

export default class Client {

  constructor({routes, rootReducer, initialState, inject, wrapper}) {
    this.routes = routes;
    const enhancer = composeWithDevTools(applyMiddleware(thunk.withExtraArgument(inject)));
    this.store = createStore(rootReducer, initialState, enhancer);
    this.wrapper = wrapper;
  }

  render(domElement) {
    const App = this.wrapper || 'div'; 
    ReactDOM.hydrate(
      <Provider store={this.store}>
        <Router>
          <App>{renderRoutes(this.routes)}</App>
        </Router>
      </Provider>
      , domElement);
  }
}
