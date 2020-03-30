import React from 'react';
import { StaticRouter } from 'react-router';
import chalk from 'chalk';

import ServerErrorWrapper from '@components/Global/Errors/ServerErrorWrapper';
import PageTemplate from '@components/Global/PageTemplate';

import renderToNodeStream from '@server/libs/renderToNodeStream';

export default (app) => app.use(function (req, res, next) {
  res.renderServerError = async (error, statusCode) => {
    try {
      console.error(chalk.red('Initial render Error:'), JSON.stringify(error, null, 2));
      console.log(`\n${error ? error.stack || 'no error stack' : 'no error stack'}`);

      statusCode = (error && error.networkError) ? error.networkError.statusCode : statusCode || 500;
      req.staticContext.error = error;
      req.staticContext.statusCode = statusCode;

      const content = await renderToNodeStream(
        <StaticRouter location={req.url} context={req.staticContext}>
          <ServerErrorWrapper staticContext={req.staticContext} />
        </StaticRouter>
      );

      const options = { content, appState: JSON.stringify(req.staticContext) };
      const html = await renderToNodeStream(<PageTemplate options={options} />);

      return res.status(statusCode).send(`<!DOCTYPE html>${html}`);
    } catch (err) {
      res.status(500).send(err.stack);
    }
  };

  return next();
});
