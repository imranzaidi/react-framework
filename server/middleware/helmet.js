import helmet from 'helmet';

export default (app) => {
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  if (`${process.env.NO_CACHE}`.match(/true/i)) {
    app.use(helmet.noCache());
  }
};
