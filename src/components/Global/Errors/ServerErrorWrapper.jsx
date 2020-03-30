import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import NetworkError from '@components/Global/Errors/NetworkError';

const ServerErrorWrapper = ({ staticContext }) => (
  <div className='App'>
    <Switch>
      <Route
        path='*'
        component={() => <NetworkError staticContext={staticContext} error={staticContext.error} />}
      />
    </Switch>
  </div>
);

ServerErrorWrapper.propTypes = {
  staticContext: PropTypes.object.isRequired
};

export default ServerErrorWrapper;
