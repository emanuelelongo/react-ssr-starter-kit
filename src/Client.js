import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { renderRoutes } from './helpers';

const history = createBrowserHistory();

export default class Client {

  constructor({routes, rootReducer, initialState, inject, wrapper, middlewares = []}) {
    this.routes = routes;
    this.history = createBrowserHistory()
    const enhancer = composeWithDevTools(
      applyMiddleware(
        routerMiddleware(this.history),
        thunk.withExtraArgument(inject),
        ...middlewares
      )
    );
    this.store = createStore(
      connectRouter(this.history)(rootReducer),
      initialState,
      enhancer
    );
    this.wrapper = wrapper;
  }

  render(domElement) {
    const App = this.wrapper || 'div'; 
    ReactDOM.hydrate(
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
            <App>{renderRoutes(this.routes)}</App>
        </ConnectedRouter>
      </Provider>
      , domElement);
  }
}
