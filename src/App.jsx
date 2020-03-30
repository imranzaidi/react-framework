import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import routes from '@routes';
import { staticContextContext } from '@src/context';
import NetworkError from '@components/Global/Errors/NetworkError';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './App.scss';

// eslint-disable-next-line no-unused-vars
export const App = (props, context) => {
  const { staticContext } = props;

  const error = staticContext.error || { networkError: { statusCode: 404 } };

  return (
    <staticContextContext.Provider value={staticContext}>
      <div className={styles.App}>
        <Switch>
          {routes.map(route => <Route {...route} key={route.path} />)}
          <Route path='*' component={() => <NetworkError {...{ staticContext, error }} />} />
        </Switch>
      </div>
    </staticContextContext.Provider>
  );
};

App.propTypes = {
  staticContext: PropTypes.shape({
    app: PropTypes.shape({
      app: PropTypes.object
    }),
    error: PropTypes.object
  }).isRequired
};

export default withStyles(styles)(App);
