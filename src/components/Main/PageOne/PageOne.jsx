import React from 'react';
import { Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <>
      <h1>Page One!</h1>
      <br />
      <Link to='/'>Go to Home page</Link>
    </>
  );
};

export default PageOne;
