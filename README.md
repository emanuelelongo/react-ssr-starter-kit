# React-SSR-Starter
React/Redux starter kit with several feature enabled:

- server side rendering
- routing
- dev-server with hot reload

## Overview
This package includes two main parts: a **Client** and a **Server** classes.
You instantiate a Server object on your Node.js server and a Client object on the client.

The Server is reponsible to serve both static contents and rendered pages, eventually prefetching initial data (see [Component requirements](#component-requirements) section).

The Client is responsible to boostrap and render the React client application inside a given DOM element.

Rendering and routing are managed isomorphically in fact you need to pass reducers and routes to both client and server, see [Server configuration](#server-configuration) and [Client configuration](#client-configuration) for more details.


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
const routes = ...
const rootReducer = ...
const initialState = ...

const client = new Client({routes, rootReducer, initialState});
client.render(document.getElementById('root'));
```

## Server configuration
The Server class constructor accepts a single configuration object parameter with the following properties:

#### _bundleFilename_ ( default: "bundle.js" )
The file name that you want to give to the bundle, without any path. 

#### _contentDivId_ ( default: "root" )
The id of the div that will wrap the whole application content

#### _layoutUrl_ ( default: null )
An URL to an handlebars layout.
The only required placeholder for the layout is `{{content}}` which will be replaced by the app content.
Any other placeholder present will have chance to be replaced by the use of the `layoutVariables` property.

#### _layoutVariables_ ( default: {} )
An object with properties that will be used to match the layout placeholders. If the `layoutUrl` is not specified this property will have no effect.

#### _middlewares_ ( default: [] )
An array of Express middlewares. They will be registered after the `Express.static` middleware and before the main application routing middleware.

#### _port_ ( default: 8080 )
The port that will be used by the web server.

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

#### _staticFolder_ ( default: 'public' )
The folder that will be used by the `Express.static` middleware to serve static content.

#### _staticPath_ ( default: '/public' )
The virtual path where the static content will be exposed.

## Client configuration
The Client class contructor accept a single configuration object with the following properties:

* routes: Array
* rootReducer: object
* initialState: object

## Component requirements
Components that requires initial data to be rendered can speify a static property <code>requirements</code> like in the following example:

``` js
class Planets {
  ...
}

Planets.requirements = [
    fetchPlanets,
    ['/planets/:id', (params) => fetchPlanetDetails(params.id) ]
  ]
```

<code>requirements</code> is an array and each item inside it can be a plain Redux Action like 
<code>fetchPlanets</code> or a bit more complicated expression like the second one in the example above. This expression means that the component <code>Planet</code> requires also the execution of the action <code>fetchPlanetDetails</code> if the routes match the <code>/planets/:id</code> pattern. As you can see you are able to access to route parameters.


## How to contribute

All the main code is inside the <code>/src</code> folder.

The <code>/example</code> folder contains an example application so that you can easly experiment or add new functionality.


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