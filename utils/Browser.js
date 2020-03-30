/* global window, document, atob, btoa */

export function atou (b64) {
  return decodeURIComponent(escape(atob(b64)));
}

export function utoa (data) {
  return btoa(unescape(encodeURIComponent(data)));
}

export function timezoneOffset () {
  const now = new Date();
  let offset = now.getTimezoneOffset() / 60;

  offset = offset * (-1);
  const isNeg = offset < 0;
  if (isNeg) offset = offset * (-1);
  if (offset < 10) offset = `0${offset}`;
  if (isNeg) offset = `-${offset}`;

  return `${offset}:00`;
}

export function getParameterByName (name, url) {
  if (!isBrowser) return;
  if (!url) url = window.location.href;
  // url = url.toLowerCase();
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');

  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function replaceUrlParam (url, paramName, paramValue) {
  if (paramValue == null) {
    paramValue = '';
  }
  const pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, '$1' + paramValue + '$2');
  }
  url = url.replace(/[?#]$/, '');
  return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
}

export function getCookieByName (name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const isBrowser = (typeof window !== 'undefined');

export function flat (arr, depth = 1) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
  }, []);
}
