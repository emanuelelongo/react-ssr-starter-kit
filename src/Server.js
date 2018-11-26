import React from 'react';
import express from 'express';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import expressHandlebars from 'express-handlebars';
import pick from 'lodash.pick';
import LayoutEngine from './LayoutEngine';
import { renderApp, fetchComponentData, matchRouteComponents, createRouterConfig } from './helpers';

const defaultConfig = {
    port: 8080,
    serveStatic: false,
    staticFolder: 'public',
    staticPath: '/public',
    template: null,
    layoutVariables: () => {},
    headersToForward: ['user-agent'],
    layoutUrl: null,
    rootReducer: {},
    preloadState: (req) => Promise.resolve({}),
    routes: [],
    middlewares: [],
    inject: null,
    wrapper: null,
    onError: (req, res, err) => {
      console.log(err);
      res.status(500).send(err.message);
    }
}

export default class Server {

  constructor(userConfig) {
    this.config = { ...defaultConfig, ...userConfig };
    if (typeof this.config.layoutVariables !== 'function') {
        const variables = {...this.config.layoutVariables};
        this.config.layoutVariables = () => variables;
    }
    this.server = express();
    this.layoutEngine = new LayoutEngine(this.config.layoutUrl);

    if (this.config.serveStatic) {
      this.server.use(this.config.staticPath, express.static(this.config.staticFolder));
    }

    this.server.engine('handlebars', this.layoutEngine.engine);
    this.server.set('view engine', 'handlebars');
    this.server.set('view cache', true);
    this.config.middlewares.map(m => this.server.use(m));


    this.server.use((req, res) => {
      const history = createMemoryHistory({
        initialEntries: [req.url]
      });

      this.config.preloadState(req)
      .then(preloadedState => {
        const store = createStore(
          connectRouter(history)(this.config.rootReducer),
          preloadedState,
          applyMiddleware(
            routerMiddleware(history),
            thunk.withExtraArgument(this.config.inject)
          )
        );
        const components = matchRouteComponents(req.path, createRouterConfig(this.config.routes));
        const componentDataPromise = fetchComponentData(store.dispatch, components, req.path, req.query);
        const headers = pick(req.headers, this.config.headersToForward);
        const layoutPromise = this.layoutEngine.resolveLayout(req, {headers});

        Promise.all([layoutPromise, componentDataPromise])
        .then(([layout]) => {
          const content = renderApp(req.path, store, this.config.routes, this.config.wrapper, history);
          res.type("text/html; charset=UTF-8");
          res.render(this.config.template, {
            layout,
            state: JSON.stringify(store.getState()),
            content,
            ...this.config.layoutVariables()
          });
        })
        .catch(err => this.config.onError(req, res, err))
      });
    });
  }

  start(callback) {
    const shutDown = (code, srv) => {
      console.log('received kill signal: shutting down gracefully');
      srv.close(() => {
        console.log('closed out remaining connections');
        process.exit(0);
      });
    }
    const srv = this.server.listen(this.config.port, callback);
    process.on('SIGTERM', code => shutDown(code, srv));
    process.on('SIGINT', code => shutDown(code, srv));
  }
}
