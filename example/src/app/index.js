import { combineReducers } from 'redux';
// In real case please import from 'react-ssr-starter/Client' without 'src'
// here we're importing from source to avoid to recompile during development
import Client from 'react-ssr-starter/src/Client';
import * as reducers from './reducers';
import routes from './routes';

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const rootReducer = combineReducers(reducers);
const client = new Client({routes, rootReducer, initialState});
client.render(document.getElementById('root'));
