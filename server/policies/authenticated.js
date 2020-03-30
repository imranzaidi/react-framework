export default (req, res, next) => {
  // do some check to make sure the person is authenticated
  return next();
};
