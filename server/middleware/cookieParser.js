import cookieParser from 'cookie-parser';

export default (app) => {
  app.use(cookieParser(process.env.SECERT || 'rP6x5a(NZY4RMDPxVR9i!HXtSNCvx1_dgUZ'));
};
