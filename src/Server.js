import React from 'react';
import express from 'express';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import remoteHandlebars from 'express-remote-handlebars';
import expressHandlebars from 'express-handlebars';
import { renderApp, fetchComponentData, matchRouteComponents, createRouterConfig } from './helpers';

const defaultConfig = {
    port: 8080,
    staticFolder: 'public',
    staticPath: '/public',
    bundleFilename: 'bundle.js',
    layoutUrl: null,
    layoutVariables: {},
    rootReducer: {},
    routes: [],
    middlewares: []
}

export default class Server {

  constructor(userConfig) {
    this.config = { ...defaultConfig, ...userConfig };
    this.server = express();
    
    this.server.use(this.config.staticPath, express.static(this.config.staticFolder));
    this.server.engine('handlebars', this.config.layoutUrl 
      ? remoteHandlebars({layout: this.config.layoutUrl})
      : expressHandlebars()
    );
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.set('view engine', 'handlebars');
    this.server.set('view cache', true);
    
    this.config.middlewares.map(m => this.server.use(m));

    this.server.use((req, res, next) => {
      const store = createStore(this.config.rootReducer, applyMiddleware(thunk));
      const components = matchRouteComponents(req.path, createRouterConfig(this.config.routes));
  
      fetchComponentData(store.dispatch, components, req.path)
        .then(() => {
          const content = renderApp(req.path, store, this.config.routes);
          res.type("text/html; charset=UTF-8");
          res.render('main', {
              state: JSON.stringify(store.getState()),
              content,
              staticPath: this.config.staticPath,
              bundleFilename: this.config.bundleFilename,
              ...this.config.layoutVariables
            }, 
            (error, html) => error ? next(error) : res.send(html)
          );
        });
    });
  }

  start(callback) {
    this.server.listen(this.config.port, callback);
  }
}