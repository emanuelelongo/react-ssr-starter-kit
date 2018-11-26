# React-ssr-starter-kit
[![CYPRESS](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/#/projects/zc3sey/runs)

This package is meant to help with the creation of an _isomorphic_ **React + Redux** application.


## Overview
The package includes two main parts: a **Client** and a **SSRMiddleware** classes.
You instantiate a `SSRMiddleware` object on your Node.js server and a `Client` object on the client.

The SSRMiddleware is reponsible to render the app content by fetching any required data (see [Component requirements](#component-requirements) section).

The Client is responsible to boostrap and render the React client application.

Rendering and routing are managed isomorphically in fact you need to pass a common routing configuration to both client and server, see [SSRMiddleware configuration](#ssrmiddleware-configuration) and [Client configuration](#client-configuration) for more details.


## Install and usage

``` sh
yarn add react-ssr-starter-kit
```

On the server:

``` js
import express from 'express';
import SSRMiddleware from 'react-ssr-starter-kit/SSRMiddleware';

 // see the "SSRMiddleware configuration" section
const config = { ... };
const ssrMiddleware = new SSRMiddleware(config);
const server = express();
server.use(ssrMiddleware.middleware);

this.server.get('*', async (req, res) => {
    const template = path.join(__dirname, './views/main.handlebars');
    res.type('text/html; charset=UTF-8');
    res.render(template, {
        state: JSON.stringify(res.state),
        content: res.content
    });
});


server.listen(8080);
```

On the client:

``` js
import Client from 'react-ssr-starter-kit/Client';

// see the "Client configuration" section
const config = { ... };

const client = new Client(config);
client.render(document.getElementById('root'));
```

## SSRMiddleware configuration
The SSRMiddleware class constructor accepts a single configuration object parameter with the following properties:

#### _initialState_
A function taking the request as parameter that create the initial redux state.

#### _template_
A path to an handlebars template that will be used to render the app content.

#### _rootReducer_
The already combined Redux reducers object.

#### _routes_
An array of objects with `path` and `component` properties.

### _inject_ ( default: null )
This is a *thunk* specific argument. It allow to inject extra argument into every action creator along
with the `dispatch` and the `getState` arguments.


## Client configuration
The Client class contructor accept a single configuration object with the following properties:

#### _routes_ ( default: null)
This has to be the same object passed to server (see the server config)

#### _rootReducer_ ( default: null )
This has to be the same object passed to server (see the server config)

#### _initialState_ ( default: null )
This field deserve special attention because it's the point of contact between client and server data.
The client has to fill this field with the state coming from the server.
See the example app to more details.

#### _inject_ ( default: null )
The *Redux-Thunk* injections.

#### _middlewares_ ( default: [] )
An array of **Redux** middleware to be registered.

## Component requirements
Components that requires initial data to be rendered can speify a static property `requirements` like in the following example:

``` js
class Planets {
  ...
}

Planets.requirements = [
    fetchPlanets,
    ['/planets/:id', (params) => fetchPlanetDetails(params.id) ]
  ]
```

`requirements` is an array and each item inside it can be a plain Redux Action like 
`fetchPlanets` or a bit more complicated expression like the second one in the example above.
This expression means that the component `Planet` requires also the execution of the action `fetchPlanetDetails` 
if the routes match the `/planets/:id` pattern. As you can see you are able to access to route parameters.


## How to contribute

All the main code is inside the `/src` folder.

The `/example` folder contains an example application so that you can easly experiment or add new functionality.

To make development more confortable the example app is already linked to the react-ssr-starter-kit package _by file system_ (look at its package.json) 
so if you make some change to the `react_ssr_kit`, simply build it to make changes available to the example app.

Build the react-ssr-starter-kit package locally

``` sh
cd react-ssr-starter-kit
yarn
yarn build
```

Launch the example app using the local built package

``` sh
cd example
yarn
yarn dev
```
