export const login = async (req, res) => {
  // do some api calling

  const options = {};
  res.cookie('token', options);

  return res.status(200).json({ message: 'set the login token!' });
};
