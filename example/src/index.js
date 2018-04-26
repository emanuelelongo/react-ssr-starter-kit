import path from 'path';
import { combineReducers } from 'redux';
// In real case please import from 'react-ssr-starter/Server' without 'src'
// here we're importing from source to avoid to recompile during development
import Server from 'react-ssr-starter/src/Server';
import webpackConfig from '../webpack.config';
import routes from './app/routes';
import * as reducers from './app/reducers';
import devMiddlewares from './devMiddlewares';

const middlewares = process.env.NODE_ENV === 'development'
  ? devMiddlewares(webpackConfig)
  : [];

const rootReducer = combineReducers(reducers);

const config = {
  port: 8080,
  serveStatic: true,
  staticFolder: path.join(__dirname, 'public'),
  staticPath: '/static',
  contentDivId: 'root',
  // layoutUrl: 'http://localhost:8000/_headerfooter.html',
  // layoutVariables: {
  //   meta: {
  //     title: 'Star Wars'
  //   }
  // },
  rootReducer,
  routes,
  middlewares
};

const server = new Server(config);
server.start(() => console.log(`Server listening on port ${config.port}`));
