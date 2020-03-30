import csurf from 'csurf';
const { SECURE_COOKIE } = process.env;

export default (app) => app.use(csurf({
  cookie: {
    signed: false,
    secure: !!`${SECURE_COOKIE}`.match(/true/i),
    httpOnly: true,
    sameSite: true
  }
}));
