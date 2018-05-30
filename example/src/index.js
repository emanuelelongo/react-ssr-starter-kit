import path from 'path';
import { combineReducers } from 'redux';
import Server from 'react-ssr-starter/Server';
import webpackConfig from '../webpack.client.config';
import routes from './app/routes';
import * as reducers from './app/reducers';
import devMiddlewares from './devMiddlewares';
import devWatcher from  './devWatcher';

const middlewares = process.env.NODE_ENV === 'development'
  ? devMiddlewares(webpackConfig)
  : [];

const rootReducer = combineReducers(reducers);
const config = {
  port: 8080,
  serveStatic: true,
  template: path.join(__dirname, 'views/main.handlebars'),
  staticFolder: path.join(__dirname, 'public'),
  staticPath: '/static',
  contentDivId: 'root',
  rootReducer,
  routes,
  middlewares
};

const server = new Server(config);

devWatcher({
    watchDir: __dirname,
    modulesToReload: /[/\\]app[/\\]/,
    callback: () => {
        server.config.routes = require('./app/routes').default; 
    }
});

server.start(() => console.log(`Server listening on port ${config.port}`));
