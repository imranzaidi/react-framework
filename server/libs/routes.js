import clientRoutes from '@routes';
import path from 'path';
import chalk from 'chalk';

function fixRouteOrder (routes) {
  const keys = Object.keys(routes)
    .map(key => ({ value: key, colonCount: key.split(':').length - 1 }))
    .sort((a, b) => a.colonCount - b.colonCount);
  return keys.reduce((result, key) => Object.assign(result, { [`${key.value}`]: routes[key.value] }), {});
}

function routes ({ reactRoutes, serverRoutes }) {
  for (const key in reactRoutes) {
    if (Object.hasOwnProperty.call(reactRoutes, key)) {
      reactRoutes[key].spa = true;
    }
  }

  return {
    serverRoutes,
    reactRoutes,
    addServerRoute: function (route) {
      this.serverRoutes = fixRouteOrder(Object.assign(this.serverRoutes, route));
    },
    combinedRoutes: function () {
      const response = {};
      const keys = Object.keys(this.serverRoutes).concat(Object.keys(this.reactRoutes))
        .map(key => ({ value: key, colonCount: key.split(':').length - 1 }))
        .sort((a, b) => a.colonCount - b.colonCount);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i].value;
        if (!reactRoutes[key]) response[key] = serverRoutes[key];
        else if (!serverRoutes[key]) response[key] = reactRoutes[key];
        else response[key] = Object.assign({}, serverRoutes[key], reactRoutes[key], serverRoutes[key]);
      }

      return response;
    }
  };
}

export default function (serverRoutes) {
  const componentRoutesObj = clientRoutes.reduce((acc, routeObj) => {
    acc[routeObj.path] = routeObj;
    return acc;
  }, {});

  const r = routes({
    reactRoutes: componentRoutesObj,
    serverRoutes: fixRouteOrder(serverRoutes)
  });

  const combinedRoutes = r.combinedRoutes();
  if (`${process.env.SERVER_DEBUG_LOG}`.match(/true/i)) {
    console.log(chalk.blue('Combined routes:'), '\n');
    console.log(combinedRoutes, '\n');
  }

  for (const key in r.serverRoutes) {
    if (!Object.hasOwnProperty.call(r.serverRoutes, key)) continue;

    const { policy: policyName } = r.serverRoutes[key];
    if (policyName) r.serverRoutes[key].policy = require(`${path.resolve()}/server/policies/${policyName}`).default;
  }

  for (const key in r.reactRoutes) {
    if (!Object.hasOwnProperty.call(r.reactRoutes, key)) continue;

    const { policy: policyName } = r.reactRoutes[key];
    if (!policyName) continue;
    if (r.serverRoutes[key]) r.serverRoutes[key].policy = require(`${path.resolve()}/server/policies/${policyName}`).default;
    else {
      r.addServerRoute({
        [`${key}`]: {
          middleware: [],
          policy: [require(`${path.resolve()}/server/policies/${policyName}`).default]
        }
      });
    }
  }

  r.reactRoutesArray = clientRoutes;
  return r;
}
