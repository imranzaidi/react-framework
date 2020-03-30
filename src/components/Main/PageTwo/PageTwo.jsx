import React from 'react';
import { Link } from 'react-router-dom';

const PageTwo = () => {
  return (
    <>
      <h1>Page two (is authenticated page)!!</h1>
      <br />
      <Link to='/'>Go to Home page</Link>
    </>
  );
};

export default PageTwo;
