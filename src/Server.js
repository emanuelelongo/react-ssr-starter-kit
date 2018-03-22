import React from 'react';
import express from 'express';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import remoteHandlebars from 'express-remote-handlebars';
import expressHandlebars from 'express-handlebars';
import handlebars from 'handlebars';
import Fastify from 'fastify';
import pov from 'point-of-view';
import { renderApp, fetchComponentData, matchRouteComponents, createRouterConfig } from './helpers';

const defaultConfig = {
    port: 8080,
    staticFolder: 'assets',
    layoutUrl: null,
    layoutVariables: {},
    rootReducer: {},
    routes: [],
    middlewares: []
}

export default class Server {

  constructor(userConfig) {
    this.config = { ...defaultConfig, ...userConfig };
    this.server = Fastify();
    
    this.server.use(express.static(this.config.staticFolder));
    this.server.register(pov, {
      engine: {
        handlebars,
      },
      templates: path.join(__dirname, 'views')
    })
    // this.server.engine('handlebars', this.config.layoutUrl 
    //   ? remoteHandlebars({layout: this.config.layoutUrl})
    //   : expressHandlebars()
    // );
    // this.server.set('views', path.join(__dirname, 'views'));
    // this.server.set('view engine', 'handlebars');
    // this.server.set('view cache', true);
    
    this.config.middlewares.map(m => this.server.use(m));

    this.server.get("*", (req, res, next) => {
      const store = createStore(this.config.rootReducer, applyMiddleware(thunk));
      const components = matchRouteComponents(req.raw.url, createRouterConfig(this.config.routes));
  
      fetchComponentData(store.dispatch, components, req.raw.url)
        .then(() => {
          const content = renderApp(req.raw.url, store, this.config.routes);
          res.view('main.hbs', {
              state: JSON.stringify(store.getState()),
              content,
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