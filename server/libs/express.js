import chalk from 'chalk';
import express from 'express';
import serverRenderer from '@server/middleware/renderer';
import {
  helmet,
  bodyParser,
  cookieParser,
  csurf,
  staticContext,
  renderServerError,
  gzipStatic
} from '@server/config/middleware';

function initializeMiddleware (app) {
  const middleWares = [
    helmet,
    bodyParser,
    cookieParser,
    csurf,
    staticContext,
    renderServerError,
    gzipStatic
  ];

  middleWares.forEach(middleware => middleware(app));
}

function bindRoutes (app, routes = []) {
  const routingData = app.locals.routes.serverRoutes;
  routes.forEach(route => {
    const middleWares = routingData[route] ? routingData[route].middleware || [] : [];
    const policy = (routingData[route] && routingData[route].policy) ? [routingData[route].policy] || [] : [];
    app[routingData[route] ? routingData[route].method || 'get' : 'get'](route, ...policy, ...middleWares, serverRenderer);
  });
}

export default function start (routes) {
  const app = express();
  initializeMiddleware(app);

  app.locals.routes = routes;
  bindRoutes(app, Object.keys(routes.combinedRoutes()));

  const DEFAULT_PORT = 3090;
  app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP, () => {
    console.info(chalk.blue(`We are live on port ${process.env.PORT || DEFAULT_PORT}:`)); // eslint-disable-line no-console
  });
}
