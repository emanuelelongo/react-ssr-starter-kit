import {createStore, applyMiddleware } from 'redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { renderApp, fetchComponentData, matchRouteComponents, createRouterConfig } from './helpers';
import { matchRoutes } from 'react-router-config';

export default class SSRMiddleware {

  constructor(config) {
    this.routes = config.routes;
    this.initialState = config.initialState;
    this.rootReducer = config.rootReducer;
    this.inject = config.inject;
    this.middleware = this.middleware.bind(this);
  }

  async middleware (req, res, next) {
    const { url, path, query } = req;
    const history = createMemoryHistory({initialEntries: [url]});

    if (matchRoutes(this.routes, path).length === 0) {
      res.sendStatus(404);
      return next('Not found');
    }
    const state = await this.initialState(req);
    const store = createStore(
      connectRouter(history)(this.rootReducer),
      state,
      applyMiddleware(
        routerMiddleware(history),
        thunk.withExtraArgument(this.inject(req))
      )
    );
    const components = matchRouteComponents(path, createRouterConfig(this.routes));

    try {
      await fetchComponentData(store.dispatch, components, path, query);
    }
    catch(err) {
      return next(err);
    }

    res.content = renderApp(path, store, this.routes, null/* wrapper */, history);
    res.state = store.getState();
    next();
  }
}
