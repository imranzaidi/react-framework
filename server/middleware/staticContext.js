export default (app) => app.use((req, res, next) => {
  req.staticContext = { app: {} };
  req.ssrStaticContext = { app: {} };
  return next();
});
