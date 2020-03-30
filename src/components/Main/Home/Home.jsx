import React from 'react';
import { Link } from 'react-router-dom';
import useStaticContext from '@hooks/useStaticContext';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Home.scss';

const Home = () => {
  const staticContext = useStaticContext();

  return (
    <>
      <h1>Home page</h1>
      <br />
      <p>Static Context:</p>
      <pre suppressHydrationWarning>{JSON.stringify(staticContext, null, 2)}</pre>
      <br />
      <Link to='/page/one'>Go to page one</Link><br />
      <Link to='/page/two'>Go to page two</Link><br />
      <Link to='/page/three'>Go to page three</Link>
    </>
  );
};

export default withStyles(styles)(Home);
