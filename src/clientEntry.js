import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import store from '@store';
import App from '@src/App.jsx';
import routes from '@routes';
import '@utils/Array';

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <Router>
      <Provider store={store}>
        <App staticContext={window.__APP_STATE__ || null} routes={routes} />
      </Provider>
    </Router>
  </StyleContext.Provider>,
  document.getElementById('root')
);
