import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import renderRoutes from './renderRoutes';

function renderApp(path, store, routes, wrapper, history) {
  const context = {};
  const App = wrapper || 'div';
  const view =
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router location={path} context={context}>
          <App>{renderRoutes(routes)}</App>
        </Router>
      </ConnectedRouter>
    </Provider>;

  return renderToString(view);
}

export default renderApp;
