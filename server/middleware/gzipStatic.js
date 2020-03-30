import gzipStatic from 'connect-gzip-static';
import path from 'path';

export default (app) => app.use(gzipStatic(
  path.resolve(__dirname, '../..', 'build'),
  {
    maxAge: '30d',
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  }
));
