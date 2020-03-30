const fs = require('fs');

export function getRoutingKey (reqRoutePath, reqUrl, routingData) {
  if (reqUrl in routingData && routingData[reqUrl]) return reqUrl;
  if (reqUrl.match(/\.(js|ico)$/)) return null;
  if (reqRoutePath in routingData && routingData[reqRoutePath]) return reqRoutePath;
  return null;
}

export function getReactRouteComponentPath (routeKey = '', reactRoutesData) {
  if (routeKey.trim() && routeKey in reactRoutesData && reactRoutesData[routeKey].componentPath) {
    return reactRoutesData[routeKey].componentPath;
  }
}

export const fileAccessPromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
