import 'regenerator-runtime/runtime';
import './config/env';
import serverRoutes from './config/routes';
import createRoutes from './libs/routes';
import start from '@server/libs/express';

const routes = createRoutes(serverRoutes);
start(routes);
