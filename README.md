# Web Service Product

A custom rolled polymorphic React application based on the following stack:

* React 16
* Nodejs / Express
* Redux
* React Router
* Material-UI
* Isomorphic-style-loader
* Webpack

## Getting up and running

First install dependencies:
 ```shell script
npm install
 ```

In separate terminals, run both client and server build in watch mode for local development:
 ```shell script
npm run build:client:watch
 ```
```shell script
npm run build:server:watch
```
**NOTE:** *If we don't need to debug or develop server-side, we can alternatively run the server build once with watch disabled:*
```shell script
npm run build:server:dev
```

Start dev server in a new terminal with:
```shell script
npm run start:dev
```

In a browser, the app can be viewed at `localhost:3090`.

Storybook:
```shell script
npm run storybook
```

## Development Notes

Always lint code before making a pull request with:
```bash
npm run lint
```

To autofix linting errors, run:
```bash
npm run lint:fix
```

## Important Context

### PageTemplate

This component is the main template for rendering all views on the server; this is where we can load external assets such as css, js, etc. Any changes to this will be global across all pages.

### req.staticContext

This variable is used to inject data into the PageTemplate. The originating object is an artifact of React Router's static router but we can use it to add additional data to serialize on the server and hydrate on the client.

### res.renderServerError

This function takes in an error and loads an error page with the correct status code or any error passed in.

## Server-side

### server/middleware

Middlewares in this directory are used by express under the hood.
 
### server/config/routes.js

We can create general controller functions (e.g. an authentication function that sets an http only cookie), this route file is used for those types of controllers

If we need a middleware to execute on the server for a particular page, we use this file by adding a route an list of associated middlewares to run.

Ex.
```javascript
import { login } from '@server/controllers/AuthenticationController';

export default {
  '/login': {
    'method': 'post',
    'middleware': [login]
  }   
}
````

## Environment and deployment

`NODE_ENV` is required by webpack internals for the build process so its only usage appears there. It **IS NOT** used anywhere
else in the application code. `NODE_ENV` is set explicitly for production / stage builds; in both cases the value assigned
is `production`. Otherwise, it default to `development`. To keep this project CI friendly in terms of deployment, feature 
flagging etc, and, for a more streamlined work flow, this is a step in the right direction and will remain strictly enforced.

### Env

The build process in development mode with read `.env.local` in the root directory and in production mode `.env`. For the
client build, only environment variables prefixed with `REACT_APP_` will be populated. In the server build, all environment
variables in one of the two above mentioned files will be picked up, including and client variables prefixed with `REACT_APP_`.

One important caveat to make note of; the list of variables used by `getServerEnvironment()` function found in `webpack/srv/env.js`.
This list is in place as a sanity check to filter only variables we want from the general bash environment and prevent everything
from finding it way in to the server code. We need to make sure the list defined inside the function reflects all the variable names
from either of the environment files previously mentioned.

**NOTE:** *Variables defined outside of the build process have no effect and are not present at runtime either on the sever
or client*

### Deployment

Like other front-end web services, it is containerized with Docker.

Build:

```bash
docker build -t [you_docker_user_name]/ws-product .
```

Run:

```bash
docker run -p 3090:8080 -d [you_docker_user_name]/ws-product
```
