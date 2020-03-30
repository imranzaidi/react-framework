import React from 'react';
import PropTypes from 'prop-types';
import env from '@beam-australia/react-env';
import Header from '@components/Global/Header';
import Footer from '@components/Global/Footer';

const NetworkError = ({ staticContext, error }) => {
  const showDebugLog = env('SHOW_DEBUG_LOG').toLowerCase() === 'true';

  const statusCode = (error && error.networkError && error.networkError.statusCode) || staticContext.statusCode || 500;
  let errorMessage = (error && error.networkError && error.networkError.message) || (error && error.message) || '';
  if (!errorMessage || !showDebugLog) {
    switch (statusCode) {
      case 404:
        errorMessage = 'Page Not Found';
        break;
      case 503:
        errorMessage = 'Service Unavailable';
        break;
      case 500:
      default:
        errorMessage = 'Internal Server Error';
    }
  }

  return (
    <div id='wrapper'>
      <div className='w1'>
        <Header />
        <div className='main'>
          <section className='info-section normal home mb32'>
            <div className='container-fluid'>
              <h1 className='text-center mb32'>Error {statusCode}</h1>
              <div className='text-center clearfix hidden-xs'>
                <span className='subtitle' style={!showDebugLog || errorMessage.length < 30 ? {} : { borderTop: 'none' }}>
                  {errorMessage}
                </span>
              </div>
              <div className='content home clearfix'>
                <div className='learn-more text-center mb32'>
                  <a href='/' className='btn btn-blue btn-bold btn-xl btn-text2'>Return Home</a>
                </div>
              </div>
              {(showDebugLog) && staticContext &&
                <pre style={{ width: '%100', height: '%100' }}>
                  {JSON.stringify(staticContext, null, 2)}
                </pre>}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

NetworkError.propTypes = {
  staticContext: PropTypes.object,
  error: PropTypes.shape({
    message: PropTypes.string,
    networkError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string
    })
  })
};

export default NetworkError;
