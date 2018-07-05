import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import renderRoutes from './renderRoutes';

function renderApp(path, store, routes, wrapper) {

  const context = {};
  const App = wrapper || 'div';
  const view =
    <Provider store={store}>
      <Router location={path} context={context}>
        <App>{renderRoutes(routes)}</App>
      </Router>
    </Provider>;

  return renderToString(view);
}

export default renderApp;
