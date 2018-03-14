import { combineReducers } from 'redux';
import Client from 'react-ssr-starter/Client';
import * as reducers from './reducers';
import routes from './routes';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const rootReducer = combineReducers(reducers);
const client = new Client(routes, rootReducer, initialState);
client.render(document.getElementById('root'));
