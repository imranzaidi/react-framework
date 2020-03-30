import React from 'react';
import PropTypes from 'prop-types';

const PageTemplate = ({ options }) => {
  const {
    webpackJsScripts,
    styles,
    appState,
    content
  } = options;

  return (
    <html lang='en'>
      <head>
        <title>My Cool Page Title</title>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta
          name='viewport'
          content='minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no'
        />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black' />
        <meta name='language' content='en' />
        <meta name='msvalidate.01' content='' />
        {styles && <style>{[...styles].join('')}</style>}
        {webpackJsScripts &&
            webpackJsScripts.map((item, i) => ~item.indexOf('.json')
              ? <link rel='manifest' href={`/static/js/${item}`} />
              : <script type='text/javascript' key={i} src={`/static/js/${item}`} defer />)}

        {appState &&
          <script dangerouslySetInnerHTML={{ __html: `window.__APP_STATE__=${JSON.stringify(appState)}` }} />}
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  );
};

PageTemplate.propTypes = {
  options: PropTypes.shape({
    webpackJsScripts: PropTypes.array.isRequired,
    styles: PropTypes.any,
    appState: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

export default PageTemplate;
