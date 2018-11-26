import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import renderRoutes from './renderRoutes';

function renderApp(path, store, routes, wrapper, history) {
    const context = {};
    const App = wrapper || 'div';
    const view =
        <Provider store={store}>
            <ConnectedRouter location={path} context={context} history={history}>
                <App>{renderRoutes(routes)}</App>
            </ConnectedRouter>
        </Provider>;

    return renderToString(view);
}

export default renderApp;

