// IE Polyfill
if (!Array.prototype.fill) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'fill', {
    value: function (value) {
      // Steps 1-2.
      if (this === null) {
        throw new TypeError('this is null or not defined');
      }

      const objectThis = Object(this);

      // Steps 3-5.
      const len = objectThis.length >>> 0;

      // Steps 6-7.
      const start = arguments[1];
      const relativeStart = start >> 0;

      // Step 8.
      let k = relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);

      // Steps 9-10.
      const end = arguments[2];
      const relativeEnd = end === undefined
        ? len : end >> 0;

      // Step 11.
      const final = relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        objectThis[k] = value;
        k++;
      }

      // Step 13.
      return objectThis;
    }
  });
}

// IE Polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      const objectThis = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = objectThis.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      const thisArg = arguments[1];

      // 5. Let k be 0.
      let k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        const kValue = objectThis[k];
        if (predicate.call(thisArg, kValue, k, objectThis)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
