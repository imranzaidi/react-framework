import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '@reducers';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '@src/App.jsx';
import PageTemplate from '@components/Global/PageTemplate';
import renderToNodeStream from '@server/libs/renderToNodeStream';
import combinedAssets from '@assets/client/webpack-client-assets.json';

function flat (arr, depth = 1) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
  }, []);
}

export default async (req, res) => {
  res.cookie('_csrfToken', req.csrfToken());
  const context = Object.assign({}, req.staticContext, req.ssrStaticContext, {
    app: Object.assign({}, req.staticContext.app, req.ssrStaticContext.app)
  });

  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  const store = createStore(rootReducer);

  const WrappedAppComponent = () => ( // eslint-disable-line no-unused-vars
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
          <App staticContext={context} />
        </StyleContext.Provider>
      </Provider>
    </StaticRouter>
  );

  try {
    // eslint-disable-next-line react/jsx-pascal-case
    const content = await renderToNodeStream(<WrappedAppComponent />);
    const preloadedState = store.getState();
    const webpackJsScripts = flat(Object.keys(combinedAssets).map(key => combinedAssets[key].js).filter(jsAsset => {
      return (jsAsset || '').match(/clientEntry.js/);
    }));

    const options = {
      cssV2: true,
      content,
      appState: Object.assign({}, req.staticContext, { reduxInitialState: preloadedState }),
      styles: css,
      webpackJsScripts
    };

    const html = await renderToNodeStream(<PageTemplate options={options} />);

    return res.send(`<!DOCTYPE html>${html}`);
  } catch (err) {
    // eslint-disable-next-line no-return-await
    return await res.renderServerError(err);
  }
};
