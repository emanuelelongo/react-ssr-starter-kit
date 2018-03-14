# React-SSR-Starter
React/Redux starter kit with several feature enabled:

- server side rendering
- routing
- ?

## Overview
This package includes two main parts: a **Client** and a **Server** classes.
You instantiate a Server object on your Node.js server and a Client object on the client.

The Server is reponsible to serve both static contents and rendered pages, eventually prefetching initial data (see [Component requirements](#component-requirements) section).

The Client is responsible to boostrap and render the React client application inside a given DOM element.

Rendering and routing are managed isomorphically in fact you need to pass reducers and routes to both client and server, see [Server configuration](#server-configuration) and [Client configuration](#client-configuration) for more details.


## Install and usage

``` sh
npm install --save react-ssr-starter
```

On the server:

``` js
import Server from 'react-ssr-starter/Server';

const config = { ... }; // see the "Server configuration" section

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

const client = new Client(routes, rootReducer, initialState);
client.render(document.getElementById('root'));
```

## Server configuration
The Server class constructor accepts a single configuration object parameter with the following properties:

  * port: number
  * staticFolder: string
  * layoutUrl: string,
  * layoutVariables: object
  * rootReducer: object
  * routes: Array
  * middlewares: Array

## Client configuration
The Client class contructor accept the following parameters:

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
npm install
npm run build
```

Link the package

``` sh
npm link
```

Launch the example app using the local built package

``` sh
cd example
npm link react-ssr-starter
npm install
npm run dev
```