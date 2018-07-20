# React-SSR-Starter
[![CYPRESS](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/#/projects/zc3sey/runs)

This package is meant to help with the creation of an _isomorphic_ **React + Redux** application.

## Philosophy
By using this package you agree several choices made during its implementation, like:
 * the use of **Redux** as _state container_
 * the use of the **Thunk** middleware to deal with asynchronous actions
 * the choice of a _state-connected_ routing
 * the use of **Express JS** as web framework
 * the use of **Handlebars** as server _template engine_
 * many other implementation details

The reason why all these dependencies were put into a single package is to facilitate the decomposition of a complex web application
into many small applications **without facing the same problems each time**.
Each decision about putting things inside or leaving outside the module is a trade-off between flexibility of use and reduction of duplication.

## Overview
The package includes two main parts: a **Client** and a **Server** classes.
You instantiate a `server` object on your Node.js server and a `client` object on the client.

The Server is reponsible to serve full rendered pages by prefetching any required data (see [Component requirements](#component-requirements) section).

The Client is responsible to boostrap and render the React client application.

Rendering and routing are managed isomorphically in fact you need to pass a common routing configuration to both client and server, see [Server configuration](#server-configuration) and [Client configuration](#client-configuration) for more details.


## Install and usage

``` sh
yarn add react-ssr-starter
```

On the server:

``` js
import Server from 'react-ssr-starter/Server';

 // see the "Server configuration" section
const config = { ... };

const server = new Server(config);
server.start(() => console.log(`Server listening on port ${config.port}`));
```

On the client:

``` js
import Client from 'react-ssr-starter/Client';

// see the "Client configuration" section
const config = { ... };

const client = new Client(config);
client.render(document.getElementById('root'));
```

## Server configuration
The Server class constructor accepts a single configuration object parameter with the following properties:

#### _port_ ( default: 8080 )
The port that will be used by the web server.

### _template_ ( default: null )
A path to an handlebars template that will be used to render the page on the server.

#### _layoutUrl_ ( default: null)
An URL to an handlebars layout.
This field can be a string containing the URL or a function _returning_ an URL. The function will be invoked by 
passing the Express `request` object. It can be useful if the URL the layout depends on the request input (Ex. the user-agent header). 

The only required placeholder for the layout is `{{content}}` which will be replaced by the app content.
Any other placeholder present will have chance to be replaced by the use of the `layoutVariables` property.

#### _layoutVariables_ ( default: {} )
An object with properties that will be used to match the layout or template placeholders.
This field can also be a function returning an object. 

#### _headersToForward_ ( default: ['user-agent'] )
An array of header names to forward in the HTTP request of the remote layout.

#### _middlewares_ ( default: [] )
An array of Express middlewares. They will be registered after the `Express.static` middleware and before the main application routing middleware.

#### _rootReducer_ ( default: {} )
The already combined Redux reducers object.

#### _routes_ ( default: [] )
An array of objects with `path` and `component` properties.

Example:
``` js
[{
  path: '/',
  component: Home 
}]
```

#### _preloadState_ ( default: null )
A function returning the initial redux state.

#### _serveStatic_ ( default: false )
Enable the `Express.static` middleware activating the static file serving.
The folder served is the one specified by the `staticFolder` parameter.

#### _staticFolder_ ( default: 'public' )
The folder that will be used by the `Express.static` middleware (if enabled by the `serveStatic` parameter)
to _search_ static content.

#### _staticPath_ ( default: '/public' )
The path that will be used by `Express.static` middleware (if enambled by the `serveStatic` parameter) 
to _expose_ staic content.

#### _middlewares_ ( default: [] )
An array of express middlewares to be registered.

#### _inject_ ( default: null )
This is a *thunk* specific argument. It allow to inject extra argument into every action creator along
with the `dispatch` and the `getState` arguments.

#### _onError_ (default: see description)
This is a callback to be executed in case of error during the handling of the request.
Its default value is a function that print the error to the console and return an `500` status code.

This function take the same parameters of an Express middleware: `req`, `res`, `err`.
**If you override the default function it's your responsibility to send a response to the client otherwise the
request will stay hanging.**


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


## FAQ

### What's the difference between the _template_ and _layoutUrl_ parameters?
todo

### Why there are two parameters _staticFolder_ and _staticPath_?
todo

#### What do you mean with _state-connected_ routing?
todo

## How to contribute

All the main code is inside the `/src` folder.

The `/example` folder contains an example application so that you can easly experiment or add new functionality.


To make development more confortable you can link the react-ssr-starter package instead of installing it directly from npm.

Build the react-ssr-starter package locally

``` sh
cd react-ssr-starter
yarn
yarn build
```

Link the package

``` sh
yarn link
```

Launch the example app using the local built package

``` sh
cd example
yarn link react-ssr-starter
yarn
yarn dev
```
