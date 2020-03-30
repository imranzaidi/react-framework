import { login } from '@server/controllers/AuthenticationController';

export default {
  '/login': {
    method: 'post',
    middleware: [login]
  }
};
