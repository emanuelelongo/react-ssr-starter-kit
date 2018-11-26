import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { combineReducers } from 'redux';
import SSRMiddleware from 'react-ssr-starter-kit/SSRMiddleware';
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
  staticFolder: path.join(__dirname, 'public'),
  contentDivId: 'root',
  rootReducer,
  routes,
  middlewares,
  initialState: () => {},
  inject: () => {}
};
const template = path.join(__dirname, 'views/main.handlebars');
const ssrMiddleware = new SSRMiddleware(config);
const server = express();
server.use('/static', express.static(path.join(__dirname, 'public')));
server.engine('handlebars', hbs.__express);
server.set('view engine', 'handlebars');
server.set('view cache', true);
middlewares.map(m => server.use(m))
server.use(ssrMiddleware.middleware);
server.get('*', (req, res) => {
  res.render(template, {
    state: JSON.stringify(res.state || {}),
    content: res.content || ''
  });
});

devWatcher({
    watchDir: __dirname,
    modulesToReload: /[/\\]app[/\\]/,
    callback: () => {
        config.routes = require('./app/routes').default; 
    }
});

server.listen(8080, () => console.log('Server listening on port 8080'));
