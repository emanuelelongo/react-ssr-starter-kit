import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderRoutes from './renderRoutes';

function renderApp(path, store, routes) {

  const context = {};
  const view =
    <Provider store={store}>
      <Router location={path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </Router>
    </Provider>;

  return renderToString(view);
}

export default renderApp;