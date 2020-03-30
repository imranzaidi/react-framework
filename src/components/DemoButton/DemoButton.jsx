import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './DemoButton.scss';

/**
 * Just a demo component to show storybook working
 */
export const DemoButton = ({ children }) => {
  return <button className='component-demo-button'>{children}</button>;
};

DemoButton.propTypes = {
  children: PropTypes.node
};

export default withStyles(styles)(DemoButton);
